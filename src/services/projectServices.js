import * as https from '../utils/https';

export const fetchRelatedProjects = async (
    adminEmail,
    searchQuery = '',
    rowsPerPage,
    page
) => {
    try {
        let headers = {
            email: adminEmail,
        };

        let response = await https.get(
            'project?rowsPerPage=' +
                rowsPerPage +
                '&&page=' +
                page +
                '&&search=' +
                searchQuery,
            headers
        );

        return response;
    } catch (err) {
        console.error('ERROR', err);
    }
};

export const createNewProject = async (
    projectName,
    description,
    adminEmail
) => {
    try {
        let data = {
            project_name: projectName,
            description: description,
            admin_email: adminEmail,
        };

        let response = await https.post('project', data);
        return response;
    } catch (err) {
        console.error('ERROR');
    }
};

export const deleteSpecificProject = async projectID => {
    try {
        let response = await https.remove(`project/${projectID}`);
        return response;
    } catch (err) {
        console.error('error deleting data');
    }
};

export const getRelatedProjectName = async (projectID, userId) => {
    let headers = {
        userId,
    };
    try {
        let response = await https.get(`project/${projectID}`, headers);
        return response;
    } catch (err) {}
};

export const updateProject = async (
    projectName,
    description,
    adminEmail,
    projectId
) => {
    try {
        let headers = {
            project_name: projectName,
            description: description,
            admin_email: adminEmail,
            projectId: projectId,
        };

        let response = await https.put('project', headers);
        return response;
    } catch (err) {
        console.error('ERROR');
    }
};
