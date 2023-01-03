const data = {
    credentials: {
        testCorrectEmail: 'automatTest@behaviolabs.com',
        testCorrectPasword: 'automatTest2023',
        testIncorrectEmail: 'test@gmail.com',
        testIncorrectPassword: 'Test123456',
    },

    errorMessages: {
        wrongPasswordErrorMessage: 'Incorrect password.',
        wrongEmailErrorMessage: 'Unknown email.',
    },

    loginPageTitle: 'Behavio: Login',
    projectPageTitle: 'Behavio: Projects',
    newProjectPageTitle: 'Behavio: New project',
    newProjectCreatingPageTitle: 'Behavio: Project',
    projectsPagePath: '/projects',
    conceptTestPagePath: '/my-new-concept-test',
    impactTestPagePath: 'my-new-impact-test',
    username: 'Rafat automat test',
    workspace: 'Automat Test',
    videoFilesPaths: [
        {
            filePath: 'e2e/resources/videos/videoSample.mp4',
            ext: 'mp4'
        },
        {
            filePath: 'e2e/resources/videos/videoSample.avi',
            ext: 'avi'
        }
    ],
    imageFilesPaths: [
        {
            filePath: 'e2e/resources/images/image.jpeg',
            ext: 'jpeg'
        },
        {
            filePath: 'e2e/resources/images/image.jpg',
            ext: 'jpg'
        },
        {
            filePath: 'e2e/resources/images/image.png',
            ext: 'png'
        }
    ],
    sampleDefinitionPopUpHeader: 'Sample Definition'
}
export default data;
