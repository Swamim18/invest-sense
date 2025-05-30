pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22'
    }

    // environment {
    // Define environment variables if needed
    // }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Swamim18/invest-sense.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install -g @angular/cli'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'ng test --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'ng build --configuration production'
            }
        }

        stage('Deploy to Localhost') {
            steps {
                // Replace this with your deploy method
                sh '''
                rm -rf /var/www/html/*
                cp -r dist/invest-sense/* /var/www/html/
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
