pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'contactlistsearch:1.0'
        DOCKER_REGISTRY_CREDENTIALS = 'dockerhub-creds' // Optional if pushing image
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/krajkumar07/ContactList_Search.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image (Optional)') {
            when {
                expression { return env.DOCKER_REGISTRY_CREDENTIALS != null }
            }
            steps {
                script {
                    docker.withRegistry('', DOCKER_REGISTRY_CREDENTIALS) {
                        docker.image(DOCKER_IMAGE).push()
                    }
                }
            }
        }

        stage('Run Container Locally (Optional)') {
            steps {
                script {
                    sh 'docker stop contactlistsearch || true'
                    sh 'docker rm contactlistsearch || true'
                    sh "docker run -d --name contactlistsearch -p 8080:80 ${DOCKER_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
