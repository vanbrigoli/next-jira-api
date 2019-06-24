import ProjectModel from "../model/ProjectModel";

const populateSlug = async () => {
  try {
    const projects = await ProjectModel.find({})
      .where("slug")
      .equals(null);

    projects.forEach(project => {
      const projectNameArray = project.name.toLowerCase().split(" ");
      project.slug = projectNameArray.join("_");
      project.save(err => {
        if (err) throw new Error("Error in updating Project model.");

        return;
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error in updating Project model.");
  }
};

export default populateSlug;
