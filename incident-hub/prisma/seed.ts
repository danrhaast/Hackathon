import {
    PrismaClient,
    IncidentSeverity,
    IncidentStatus,
  } from "@prisma/client";
  
  const prisma = new PrismaClient();
  
  async function main() {
    await prisma.incident.createMany({
      data: [
        {
          title: "Falha no processamento de pagamentos",
          description:
            "Pagamentos estão apresentando falha durante o processamento.",
          severity: IncidentSeverity.CRITICAL,
          status: IncidentStatus.OPEN,
        },
        {
          title: "Instabilidade no sistema",
          description:
            "O sistema apresenta lentidão em determinados períodos.",
          severity: IncidentSeverity.HIGH,
          status: IncidentStatus.IN_PROGRESS,
        },
        {
          title: "Erro de sincronização",
          description:
            "Alguns registros não estão sendo sincronizados corretamente.",
          severity: IncidentSeverity.MEDIUM,
          status: IncidentStatus.OPEN,
        },
        {
          title: "Problema visual no painel",
          description:
            "Um componente do painel apresenta comportamento inesperado.",
          severity: IncidentSeverity.LOW,
          status: IncidentStatus.RESOLVED,
        },
        {
          title: "Falha de comunicação bancária",
          description:
            "A comunicação com uma instituição bancária foi interrompida.",
          severity: IncidentSeverity.CRITICAL,
          status: IncidentStatus.IN_PROGRESS,
        },
      ],
    });
  
    console.log("Seed executado com sucesso.");
  }
  
  main()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });