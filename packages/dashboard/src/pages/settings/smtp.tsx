import React, { useState } from "react";
import { Card, FullscreenLoader, Modal, SettingTabs } from "../../components";
import { Dashboard } from "../../layouts";
import { useActiveProject, useProjects } from "../../lib/hooks/projects";
import { toast } from "sonner";
import { DEFAULT_DOMAIN } from "dashboard/src/lib/constants";

/**
 *
 */
export default function Index() {
  const activeProject = useActiveProject();
  const { data: projects, mutate: projectMutate } = useProjects();


  if (!activeProject) {
    return <FullscreenLoader />;
  }

  return (
    <>
      <Dashboard>
        <SettingTabs />
        <Card title={"SMTP"} description="Send emails via SMTP">
          <div className={"py-4"}>
            <div className={"gap-3 lg:grid lg:grid-cols-8"}>
              <div onClick={() => {
                void navigator.clipboard.writeText(activeProject.public);
                toast.success("Copied your SMTP Host");
              }} className={"col-span-6"}>
                <label className={"block text-sm font-medium text-neutral-700"}>
                  Hostname
                </label>
                <p
                  className={
                    "cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm"
                  }
                >
                  smtp.{DEFAULT_DOMAIN}
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
              <div onClick={() => {
                void navigator.clipboard.writeText(activeProject.public);
                toast.success("Copied your SMTP Username");
              }} className={"col-span-4"}>
                <label className={"block text-sm font-medium text-neutral-700"}>
                  Username
                </label>
                <p
                  className={
                    "cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm"
                  }
                >
                  smtpuser
                </p>
              </div>
              <div onClick={() => {
                void navigator.clipboard.writeText(activeProject.public);
                toast.success("Copied your SMTP Password");
              }} className={"col-span-4"}>
                <label className={"block text-sm font-medium text-neutral-700"}>
                  Password
                </label>
                <p
                  className={
                    "cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm"
                  }
                >
                  {activeProject.secret}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Dashboard>
    </>
  );
}
