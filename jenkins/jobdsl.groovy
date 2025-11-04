pipelineJob('ContactListSearch-CI') {
    description('CI Pipeline job for Contact List Search application')

    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('https://github.com/krajkumar07/ContactList_Search.git')
                        // credentials('github-credentials-id') // Uncomment if private repo
                    }
                    branches('main')
                }
            }
            scriptPath('Jenkinsfile')
        }
    }

    triggers {
        scm('H/5 * * * *')  // Poll every 5 minutes or configure webhook for push triggers
    }
}
