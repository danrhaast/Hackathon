```javascript
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
  RESOLVED: "Resolvido",
};

const severityLabels = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  CRITICAL: "Crítica",
};

async function loadDashboard() {
  try {
    const response = await fetch(`${API}/dashboard`);

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
    console.error(error);
  }
}

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

    const query = params.toString();

    const response = await fetch(
      `${API}${query ? `?${query}` : ""}`
    );

    if (!response.ok) {
      throw new Error("Erro ao carregar incidentes");
    }

    const incidents = await response.json();

    renderIncidents(incidents);
  } catch (error) {
    console.error(error);

    incidentList.innerHTML = `
      <p class="error">
        Não foi possível carregar os incidentes.
      </p>
    `;
  }
}

function renderIncidents(incidents) {
  if (!incidents.length) {
    incidentList.innerHTML = `
      <p class="empty">
        Nenhum incidente encontrado.
      </p>
    `;

    return;
  }

  incidentList.innerHTML = incidents
    .map((incident) => {
      const severityClass =
        `severity-${incident.severity.toLowerCase()}`;

      const statusClass =
        `status-${incident.status
          .toLowerCase()
          .replace("_", "-")}`;

      return `
        <article class="incident">

          <div class="incident-info">
            <h3>${escapeHtml(incident.title)}</h3>

            <p>
              ${escapeHtml(
                truncate(incident.description, 120)
              )}
            </p>
          </div>

          <div class="incident-meta">

            <span class="badge ${severityClass}">
              ${severityLabels[incident.severity]}
            </span>

            <span class="badge ${statusClass}">
              ${statusLabels[incident.status]}
            </span>

            <button
              class="details-button"
              onclick="openIncident('${incident.id}')"
            >
              Detalhes
            </button>

          </div>

        </article>
      `;
    })
    .join("");
}

async function openIncident(id) {
  detailsModal.classList.remove("hidden");

  const detailsBody = document.getElementById("detailsBody");

  detailsBody.innerHTML =
    '<p class="loading">Carregando incidente...</p>';

  try {
    const response = await fetch(`${API}/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao carregar incidente");
    }

    const incident = await response.json();

    document.getElementById("detailsTitle").textContent =
      incident.title;

    renderIncidentDetails(incident);
  } catch (error) {
    console.error(error);

    detailsBody.innerHTML = `
      <p class="error">
        Não foi possível carregar o incidente.
      </p>
    `;
  }
}

async function renderIncidentDetails(incident) {
  const detailsBody = document.getElementById("detailsBody");

  let timeline = [];

  try {
    const response = await fetch(
      `${API}/${incident.id}/timeline`
    );

    if (response.ok) {
      timeline = await response.json();
    }
  } catch (error) {
    console.error(error);
  }

  detailsBody.innerHTML = `
    <div class="detail-description">
      ${escapeHtml(incident.description)}
    </div>

    <div>
      <span class="badge severity-${incident.severity.toLowerCase()}">
        ${severityLabels[incident.severity]}
      </span>

      <span class="badge status-${incident.status
        .toLowerCase()
        .replace("_", "-")}">
        ${statusLabels[incident.status]}
      </span>
    </div>

    <div class="detail-section">
      <h3>Alterar status</h3>

      <div class="status-actions">

        ${
          incident.status !== "OPEN"
            ? `
              <button
                class="button secondary"
                onclick="updateStatus('${incident.id}', 'OPEN')"
              >
                Aberto
              </button>
            `
            : ""
        }

        ${
          incident.status !== "IN_PROGRESS"
            ? `
              <button
                class="button secondary"
                onclick="updateStatus('${incident.id}', 'IN_PROGRESS')"
              >
                Em andamento
              </button>
            `
            : ""
        }

        ${
          incident.status !== "RESOLVED"
            ? `
              <button
                class="button primary"
                onclick="updateStatus('${incident.id}', 'RESOLVED')"
              >
                Resolver
              </button>
            `
            : ""
        }

      </div>
    </div>

    <div class="detail-section">
      <h3>Timeline</h3>

      <div class="timeline">
        ${
          timeline.length
            ? timeline
                .map(renderTimelineItem)
                .join("")
            : `
              <p class="empty">
                Nenhuma atividade registrada.
              </p>
            `
        }
      </div>
    </div>

    <div class="detail-section">
      <h3>Novo comentário</h3>

      <form
        class="comment-form"
        onsubmit="addComment(event, '${incident.id}')"
      >

        <input
          id="commentAuthor"
          type="text"
          placeholder="Seu nome"
          required
        >

        <textarea
          id="commentContent"
          placeholder="Escreva um comentário..."
          required
        ></textarea>

        <button type="submit" class="button primary">
          Adicionar comentário
        </button>

      </form>
    </div>
  `;
}

function renderTimelineItem(item) {
  const date = new Date(item.date);

  const formattedDate = date.toLocaleString("pt-BR");

  if (item.type === "STATUS_CHANGE") {
    return `
      <div class="timeline-item">

        <div class="timeline-date">
          ${formattedDate}
        </div>

        <strong>
          Status alterado
        </strong>

        <p>
          ${item.previousStatus
            ? statusLabels[item.previousStatus]
            : "Criado"}
          →
          ${statusLabels[item.newStatus]}
        </p>

        ${
          item.author
            ? `<small>Por ${escapeHtml(item.author)}</small>`
            : ""
        }

      </div>
    `;
  }

  return `
    <div class="timeline-item">

      <div class="timeline-date">
        ${formattedDate}
      </div>

      <strong>
        ${escapeHtml(item.author)} comentou:
      </strong>

      <p>
        ${escapeHtml(item.content)}
      </p>

    </div>
  `;
}

async function updateStatus(id, status) {
  try {
    const response = await fetch(`${API}/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        changedBy: "Usuário",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Não foi possível alterar o status.");
      return;
    }

    await loadDashboard();
    await loadIncidents();

    openIncident(id);
  } catch (error) {
    console.error(error);
    alert("Erro ao alterar status.");
  }
}

async function addComment(event, id) {
  event.preventDefault();

  const author =
    document.getElementById("commentAuthor").value.trim();

  const content =
    document.getElementById("commentContent").value.trim();

  if (!author || !content) {
    alert("Autor e comentário são obrigatórios.");
    return;
  }

  try {
    const response = await fetch(
      `${API}/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author,
          content,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Não foi possível adicionar o comentário.");
      return;
    }

    openIncident(id);
  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar comentário.");
  }
}

/* Modal */

document
  .getElementById("newIncidentButton")
  .addEventListener("click", () => {
    incidentModal.classList.remove("hidden");
  });

document
  .getElementById("closeModal")
  .addEventListener("click", closeIncidentModal);

document
  .getElementById("cancelModal")
  .addEventListener("click", closeIncidentModal);

document
  .getElementById("closeDetails")
  .addEventListener("click", () => {
    detailsModal.classList.add("hidden");
  });

function closeIncidentModal() {
  incidentModal.classList.add("hidden");
  incidentForm.reset();
}

/* Criar incidente */

incidentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    title: document.getElementById("title").value.trim(),
    description: document
      .getElementById("description")
      .value.trim(),
    severity: document.getElementById("severity").value,
  };

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Não foi possível criar o incidente.");
      return;
    }

    closeIncidentModal();

    await loadDashboard();
    await loadIncidents();
  } catch (error) {
    console.error(error);
    alert("Erro ao criar incidente.");
  }
});

/* Filtros */

statusFilter.addEventListener("change", loadIncidents);
severityFilter.addEventListener("change", loadIncidents);

/* Segurança básica para conteúdo vindo da API */

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.substring(0, maxLength)}...`;
}

/* Inicialização */

loadDashboard();
loadIncidents();
```
