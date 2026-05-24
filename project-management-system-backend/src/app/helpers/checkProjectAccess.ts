import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { Project } from "../module/project/project.model";

 

export const checkProjectAccess =
  async (
    projectId: string,
    user: JwtPayload
  ) => {
    const project =
      await Project.findOne({
        _id: projectId,
        isDeleted: false,
      });

      if (!project) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Project not found"
      );
    }

    const isMember =
      project.members.some(
        (member) =>
          member.toString() ===
          user.userId
      );

    const isManager =
      project.projectManager?.toString() ===
      user.userId;

    const isCreator =
      project.createdBy.toString() ===
      user.userId;

    const isAdmin =
      user.role ===
        "admin" ||
      user.role ===
        "superAdmin";

    if (
      !isMember &&


    !isManager &&
      !isCreator &&
      !isAdmin
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have access to this project"
      );
    }

    return project;
  };


  