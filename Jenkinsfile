pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22'
    }

    environment {
        DEPLOY_DIR = '/usr/share/nginx/html'
        BUILD_DIR = 'dist/invest-sense'
    }

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
            environment {
                CHROME_BIN = '/usr/bin/google-chrome'
            }
            steps {
                sh 'ng test --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'ng build --configuration production'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                // Requires Jenkins user to have access to Nginx folder
                sh '''
                rm -rf ${DEPLOY_DIR}/*
                cp -r ${BUILD_DIR}/browser/* ${DEPLOY_DIR}/
                cp ${BUILD_DIR}/3rdpartylicenses.txt ${DEPLOY_DIR}/
                cp ${BUILD_DIR}/prerendered-routes.json ${DEPLOY_DIR}/
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
