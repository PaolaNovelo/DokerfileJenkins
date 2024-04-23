pipeline{
    agent any
    environment {
        RAMA = ''
    }
    stages{
        stage('get GitUrl'){
            steps{
                echo "${GIT_URL}"
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                echo 'building...'
                script{
                    RAMA = sh(script: 'echo $GIT_BRANCH | cut -b 8-14 | tr "[:upper:]" "[:lower:]" | tr "/" "_"', returnStdout: true).trim()
                    echo "RAMA value: ${RAMA}"
                }
                sh "sudo docker build -t sicei-${RAMA}:1.0.0-${BUILD_NUMBER} ."
            }
        }

         stage('Test') {
            steps {
                echo 'yet to be implemented...'
                echo 'testing...'
            }
        }

        stage('Deploy'){
            steps{
                echo 'deploying...'
                sh "sudo docker run -d --name sice-${RAMA} -p 3000:3000 sicei-${RAMA}:1.0.0-${BUILD_NUMBER}"
            }
        }
    }

}
