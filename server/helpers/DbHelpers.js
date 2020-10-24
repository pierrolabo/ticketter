const Project = require('../models/Project');

module.exports = {
  getOrCreateGeneralProject: async () => {
    //Check if the general project exist in database
    const generalProject = await Project.findOne({ name: 'GENERAL' });
    if (generalProject) {
      return generalProject;
    } else {
      const newProject = new Project({
        name: 'GENERAL',
        description: 'default project',
      });

      //Save the general project
      try {
        await newProject.save();
        return newProject;
      } catch (err) {
        console.log(`Error DbHelpers.getGeneralProject: ${err}`);
      }
    }
  },
};
