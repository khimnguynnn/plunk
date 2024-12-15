import type { Project } from "@prisma/client";
import React, { useState } from "react";
import { Card, FullscreenLoader, Modal, SettingTabs } from "../../components";
import { Dashboard } from "../../layouts";
import { useActiveProject, useProjects } from "../../lib/hooks/projects";
import { network } from "../../lib/network";

import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

/**
 *
 */
export default function Index() {
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [project, setProject] = useState<Project>();

  const activeProject = useActiveProject();
  const { data: projects, mutate: projectMutate } = useProjects();

  if (activeProject && !project) {
    setProject(activeProject);
  }

  if (!project || !projects) {
    return <FullscreenLoader />;
  }

  if (!activeProject) {
    return <FullscreenLoader />;
  }

  const regenerate = () => {
    setShowRegenerateModal(!showRegenerateModal);

    toast.promise(
      network
        .fetch<{
          success: true;
          project: Project;
        }>("POST", `/projects/id/${project.id}/regenerate`)
        .then(async (res) => {
          await projectMutate(
            [
              ...projects.filter((project) => {
                return project.id !== res.project.id;
              }),
              res.project,
            ],
            false
          );
        }),
      {
        loading: "Regenerating API keys...",
        success: "Successfully regenerated API keys!",
        error: "Failed to create new API keys",
      }
    );
  };

  return (
    <>
      <Modal
        isOpen={showRegenerateModal}
        onToggle={() => setShowRegenerateModal(!showRegenerateModal)}
        onAction={regenerate}
        type={"danger"}
        title={"Are you sure?"}
        description={
          "Any applications that use your previously generated keys will stop working!"
        }
      />
      <Dashboard>
        <SettingTabs />
        <Card title={"SMTP"} description="Send emails via SMTP">
          <div className={"py-4"}>
            <div className={"gap-3 lg:grid lg:grid-cols-8"}>
              <div className={"col-span-6"}>
                <label className={"block text-sm font-medium text-neutral-700"}>
                  Hostname
                </label>
                <p
                  className={
                    "cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm"
                  }
                >
                  smtp.useplunk.com
                </p>
              </div>
              <div className={"col-span-2"}>
                <label className={"block text-sm font-medium text-neutral-700"}>
                  Port
                </label>
                <p
                  className={
                    "cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm"
                  }
                >
                  465 or 587
                </p>
              </div>
              <div className={"col-span-4"}>
                <label className={"block text-sm font-medium text-neutral-700"}>
                  Username
                </label>
                <p
                  className={
                    "cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm"
                  }
                >
                  plunk
                </p>
              </div>
              <div className={"col-span-4"}>
                <label className={"block text-sm font-medium text-neutral-700"}>
                  Password
                </label>
                <p
                  className={
                    "cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm"
                  }
                >
                  sk_ce772b486e37b0bd65003458511e50d857aefbd988109451
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Dashboard>
    </>
  );
}
