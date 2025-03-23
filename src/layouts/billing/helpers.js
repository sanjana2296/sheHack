export const initTasks = () => {
  const tasks = [
    // Project 1
    {
      line: 0,
      type: "project",
      id: "ProjectSample",
      name: "1.Project",
      start: new Date(2024, 6, 1),
      end: new Date(2024, 9, 30),
      progress: 25,
      hideChildren: false,
    },
    {
      line: 1,
      type: "task",
      id: "Task 0",
      name: "1.1 Task",
      start: new Date(2024, 6, 1),
      end: new Date(2024, 6, 30),
      progress: 45,
      project: "ProjectSample",
    },
    {
      line: 2,
      type: "task",
      id: "Task 1",
      name: "1.2 Task",
      start: new Date(2024, 7, 1),
      end: new Date(2024, 7, 30),
      progress: 25,
      dependencies: ["Task 0"],
      project: "ProjectSample",
    },
    {
      line: 3,
      type: "task",
      id: "Task 2",
      name: "1.3 Task",
      start: new Date(2024, 6, 1),
      end: new Date(2024, 7, 30),
      progress: 10,
      dependencies: ["Task 1"],
      project: "ProjectSample",
    },
    {
      line: 4,
      type: "milestone",
      id: "Task 6",
      name: "1.3.1 MileStone (KT)",
      start: new Date(2024, 6, 1),
      end: new Date(2024, 6, 30),
      progress: 100,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
    {
      line: 4,
      type: "milestone",
      id: "Task 7",
      name: "1.3.2 MileStone (KT)",
      start: new Date(2024, 7, 1),
      end: new Date(2024, 7, 30),
      progress: 100,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
    {
      line: 5,
      type: "task",
      id: "Task 3",
      name: "1.4 Task",
      start: new Date(2024, 8, 1),
      end: new Date(2024, 8, 30),
      progress: 2,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
    {
      line: 6,
      type: "task",
      id: "Task 4",
      name: "1.5 Task",
      start: new Date(2024, 9, 1),
      end: new Date(2024, 9, 30),
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
    {
      line: 7,
      type: "milestone",
      id: "Task 5",
      name: "1.5.1 MileStone (KT)",
      start: new Date(2024, 9, 1),
      end: new Date(2024, 9, 30),
      progress: 100,
      dependencies: ["Task 4"],
      project: "ProjectSample",
    },
  ];
  return tasks;
};

// Gets the start and end date for a project
export const getStartEndDateForProject = (tasks, projectId) => {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
};
