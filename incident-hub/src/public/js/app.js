
const incidentList = document.getElementById("incidentList");

const statusFilter = document.getElementById("statusFilter");
const severityFilter = document.getElementById("severityFilter");

const incidentModal = document.getElementById("incidentModal");
const detailsModal = document.getElementById("detailsModal");

const incidentForm = document.getElementById("incidentForm");

const API = "/incidents";

const statusLabels = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em andamento",
  RESOLVED: "Resolvido"
};

const severityLabels = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  CRITICAL: "Crítica"
};


// ===============================
// DASHBOARD
// ===============================

async function loadDashboard() {
  try {
    const response = await fetch(API + "/dashboard");

    if (!response.ok) {
      throw new Error("Erro ao carregar dashboard");
    }

    const data = await response.json();

    document.getElementById("total").textContent = data.total;
    document.getElementById("open").textContent = data.open;
    document.getElementById("inProgress").textContent = data.inProgress;
    document.getElementById("resolved").textContent = data.resolved;
    document.getElementById("critical").textContent = data.critical;

  } catch (error) {
    console.error("Erro no dashboard:", error);
  }
}


// ===============================
// LISTAR INCIDENTES
// ===============================

async function loadIncidents() {
  try {
    incidentList.innerHTML =
      '<p class="loading">Carregando incidentes...</p>';

    const params = new URLSearchParams();

    if (statusFilter.value) {
      params.append("status", statusFilter.value);
    }

    if (severityFilter.value) {
      params.append("severity", severityFilter.value);
    }

    let url = API;

    if (params.toString()) {
      url += "?" + params.toString();
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const incidents = await response.json();

    console.log("Incidentes recebidos:", incidents);

    renderIncidents(incidents);

  } catch (error) {
    console.error("Erro ao carregar incidentes:", error);

    incidentList.innerHTML =
      '<p class="error">Não foi possível carregar os incidentes.</p>';
  }
}


// ===============================
// RENDERIZAR INCIDENTES
// ===============================

function renderIncidents(incidents) {

  if (!incidents || incidents.length === 0) {
    incidentList.innerHTML =
      '<p class="empty">Nenhum incidente encontrado.</p>';

    return;
  }

  incidentList.innerHTML = "";

  incidents.forEach(function (incident) {

    const article = document.createElement("article");

    article.className = "incident";

    const info = document.createElement("div");

    info.className = "incident-info";

    const title = document.createElement("h3");

    title.textContent = incident.title;

    const description = document.createElement("p");

    description.textContent =
      truncate(incident.description, 120);

    info.appendChild(title);
    info.appendChild(description);


    const meta = document.createElement("div");

    meta.className = "incident-meta";


    const severity = document.createElement("span");

    severity.className =
      "badge severity-" + incident.severity.toLowerCase();

    severity.textContent =
      severityLabels[incident.severity];


    const status = document.createElement("span");

    status.className =
      "badge status-" +
      incident.status.toLowerCase().replace("_", "-");

    status.textContent =
      statusLabels[incident.status];


    const button = document.createElement("button");

    button.className = "details-button";

    button.textContent = "Detalhes";

    button.addEventListener("click", function () {
      openIncident(incident.id);
    });


    meta.appendChild(severity);
    meta.appendChild(status);
    meta.appendChild(button);

    article.appendChild(info);
    article.appendChild(meta);

    incidentList.appendChild(article);
  });
}


// ===============================
// DETALHES
// ===============================

async function openIncident(id) {

  detailsModal.classList.remove("hidden");

  const detailsBody =
    document.getElementById("detailsBody");

  detailsBody.innerHTML =
    '<p class="loading">Carregando incidente...</p>';

  try {

    const response =
      await fetch(API + "/" + id);

    if (!response.ok) {
      throw new Error("Erro ao carregar incidente");
    }

    const incident =
      await response.json();

    document.getElementById("detailsTitle").textContent =
      incident.title;

    await renderIncidentDetails(incident);

  } catch (error) {

    console.error(error);

    detailsBody.innerHTML =
      '<p class="error">Não foi possível carregar o incidente.</p>';
  }
}


// ===============================
// DETALHES DO INCIDENTE
// ===============================

async function renderIncidentDetails(incident) {

  const detailsBody =
    document.getElementById("detailsBody");

  let timeline = [];

  try {

    const response =
      await fetch(
        API + "/" + incident.id + "/timeline"
      );

    if (response.ok) {
      timeline = await response.json();
    }

  } catch (error) {
    console.error("Erro na timeline:", error);
  }


  const description =
    document.createElement("div");

  description.className =
    "detail-description";

  description.textContent =
    incident.description;


  const badges =
    document.createElement("div");


  const severity =
    document.createElement("span");

  severity.className =
    "badge severity-" +
    incident.severity.toLowerCase();

  severity.textContent =
    severityLabels[incident.severity];


  const status =
    document.createElement("span");

  status.className =
    "badge status-" +
    incident.status.toLowerCase().replace("_", "-");

  status.textContent =
    statusLabels[incident.status];


  badges.appendChild(severity);
  badges.appendChild(status);


  const statusSection =
    document.createElement("div");

  statusSection.className =
    "detail-section";


  const statusTitle =
    document.createElement("h3");

  statusTitle.textContent =
    "Alterar status";


  const statusActions =
    document.createElement("div");

  statusActions.className =
    "status-actions";


  if (incident.status !== "OPEN") {
    createStatusButton(
      statusActions,
      incident.id,
      "OPEN",
      "Aberto"
    );
  }

  if (incident.status !== "IN_PROGRESS") {
    createStatusButton(
      statusActions,
      incident.id,
      "IN_PROGRESS",
      "Em andamento"
    );
  }

  if (incident.status !== "RESOLVED") {
    createStatusButton(
      statusActions,
      incident.id,
      "RESOLVED",
      "Resolver"
    );
  }


  statusSection.appendChild(statusTitle);
  statusSection.appendChild(statusActions);


  const timelineSection =
    document.createElement("div");

  timelineSection.className =
    "detail-section";


  const timelineTitle =
    document.createElement("h3");

  timelineTitle.textContent =
    "Timeline";


  const timelineContainer =
    document.createElement("div");

  timelineContainer.className =
    "timeline";


  if (timeline.length === 0) {

    timelineContainer.innerHTML =
      '<p class="empty">Nenhuma atividade registrada.</p>';

  } else {

    timeline.forEach(function (item) {

      const element =
        createTimelineItem(item);

      timelineContainer.appendChild(element);

    });
  }


  timelineSection.appendChild(timelineTitle);
  timelineSection.appendChild(timelineContainer);


  const commentSection =
    document.createElement("div");

  commentSection.className =
    "detail-section";


  const commentTitle =
    document.createElement("h3");

  commentTitle.textContent =
    "Novo comentário";


  const form =
    document.createElement("form");

  form.className =
    "comment-form";


  const author =
    document.createElement("input");

  author.id =
    "commentAuthor";

  author.type =
    "text";

  author.placeholder =
    "Seu nome";

  author.required =
    true;


  const content =
    document.createElement("textarea");

  content.id =
    "commentContent";

  content.placeholder =
    "Escreva um comentário...";

  content.required =
    true;


  const submit =
    document.createElement("button");

  submit.type =
    "submit";

  submit.className =
    "button primary";

  submit.textContent =
    "Adicionar comentário";


  form.appendChild(author);
  form.appendChild(content);
  form.appendChild(submit);


  form.addEventListener("submit", function (event) {

    addComment(
      event,
      incident.id
    );

  });


  commentSection.appendChild(commentTitle);
  commentSection.appendChild(form);


  detailsBody.innerHTML = "";

  detailsBody.appendChild(description);
  detailsBody.appendChild(badges);
  detailsBody.appendChild(statusSection);
  detailsBody.appendChild(timelineSection);
  detailsBody.appendChild(commentSection);
}


// ===============================
// BOTÕES DE STATUS
// ===============================

function createStatusButton(
  container,
  id,
  status,
  label
) {

  const button =
    document.createElement("button");

  button.className =
    "button secondary";

  button.textContent =
    label;

  button.addEventListener(
    "click",
    function () {
      updateStatus(id, status);
    }
  );

  container.appendChild(button);
}


// ===============================
// TIMELINE
// ===============================

function createTimelineItem(item) {

  const element =
    document.createElement("div");

  element.className =
    "timeline-item";


  const date =
    document.createElement("div");

  date.className =
    "timeline-date";

  date.textContent =
    new Date(item.date).toLocaleString("pt-BR");


  element.appendChild(date);


  if (item.type === "STATUS_CHANGE") {

    const title =
      document.createElement("strong");

    title.textContent =
      "Status alterado";

    const text =
      document.createElement("p");

    const previous =
      item.previousStatus
        ? statusLabels[item.previousStatus]
        : "Criado";

    const current =
      statusLabels[item.newStatus];

    text.textContent =
      previous + " → " + current;

    element.appendChild(title);
    element.appendChild(text);


    if (item.author) {

      const author =
        document.createElement("small");

      author.textContent =
        "Por " + item.author;

      element.appendChild(author);
    }

  } else {

    const title =
      document.createElement("strong");

    title.textContent =
      item.author + " comentou:";


    const content =
      document.createElement("p");

    content.textContent =
      item.content;


    element.appendChild(title);
    element.appendChild(content);
  }


  return element;
}


// ===============================
// ALTERAR STATUS
// ===============================

async function updateStatus(id, status) {

  try {

    const response =
      await fetch(
        API + "/" + id + "/status",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            status: status,
            changedBy: "Usuário"
          })
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      alert(
        data.message ||
        "Não foi possível alterar o status."
      );

      return;
    }


    await loadDashboard();
    await loadIncidents();

    await openIncident(id);

  } catch (error) {

    console.error(error);

    alert("Erro ao alterar status.");
  }
}


// ===============================
// COMENTÁRIOS
// ===============================

async function addComment(event, id) {

  event.preventDefault();


  const author =
    document
      .getElementById("commentAuthor")
      .value
      .trim();


  const content =
    document
      .getElementById("commentContent")
      .value
      .trim();


  if (!author || !content) {

    alert(
      "Autor e comentário são obrigatórios."
    );

    return;
  }


  try {

    const response =
      await fetch(
        API + "/" + id + "/comments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            author: author,
            content: content
          })
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      alert(
        data.message ||
        "Não foi possível adicionar o comentário."
      );

      return;
    }


    await openIncident(id);

  } catch (error) {

    console.error(error);

    alert("Erro ao adicionar comentário.");
  }
}


// ===============================
// MODAIS
// ===============================

document
  .getElementById("newIncidentButton")
  .addEventListener(
    "click",
    function () {

      incidentModal.classList.remove("hidden");

    }
  );


document
  .getElementById("closeModal")
  .addEventListener(
    "click",
    closeIncidentModal
  );


document
  .getElementById("cancelModal")
  .addEventListener(
    "click",
    closeIncidentModal
  );


document
  .getElementById("closeDetails")
  .addEventListener(
    "click",
    function () {

      detailsModal.classList.add("hidden");

    }
  );


function closeIncidentModal() {

  incidentModal.classList.add("hidden");

  incidentForm.reset();
}


// ===============================
// CRIAR INCIDENTE
// ===============================

incidentForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();


    const data = {

      title:
        document
          .getElementById("title")
          .value
          .trim(),

      description:
        document
          .getElementById("description")
          .value
          .trim(),

      severity:
        document
          .getElementById("severity")
          .value
    };


    try {

      const response =
        await fetch(
          API,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        alert(
          result.message ||
          "Não foi possível criar o incidente."
        );

        return;
      }


      closeIncidentModal();

      await loadDashboard();
      await loadIncidents();

    } catch (error) {

      console.error(error);

      alert("Erro ao criar incidente.");
    }
  }
);


// ===============================
// FILTROS
// ===============================

statusFilter.addEventListener(
  "change",
  loadIncidents
);

severityFilter.addEventListener(
  "change",
  loadIncidents
);


// ===============================
// UTILITÁRIOS
// ===============================

function truncate(value, maxLength) {

  if (!value) {
    return "";
  }

  if (value.length <= maxLength) {
    return value;
  }

  return value.substring(0, maxLength) + "...";
}


// ===============================
// INICIALIZAÇÃO
// ===============================

loadDashboard();
loadIncidents();

