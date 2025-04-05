pipeline {
    agent any

    environment {
        REMOTE_HOST = 'ubuntu@3.111.41.148'
        REMOTE_DIR = '/home/ubuntu/incident_management_system'
    }

    stages {
        stage('Clone') {
            steps {
                git url: 'https://github.com/skumar5011987/incident_management_system.git', branch: 'main'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['0448a118-2f13-4553-82fb-b05a3751ff22']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $REMOTE_HOST '
                        cd $REMOTE_DIR &&
                        git pull origin main &&
                        docker-compose down &&
                        docker-compose build &&
                        docker-compose up -d
                    '
                    """
                }
            }
        }
    }
}
