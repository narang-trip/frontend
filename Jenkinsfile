pipeline {
    agent any

    environment {
        GRADLE_HOME = tool 'Gradle'
    }

    stages {
        stage('Checkout') {
            steps {
                // 소스 코드 체크아웃
                checkout scm
            }
        }
        stage('Build') {
            steps {
                // Gradle을 사용하여 trip-service 프로젝트 빌드
                sh "cd backend/trip-service && ${GRADLE_HOME}/bin/gradle clean build"
            }
        }
        stage('Deploy') {
            steps {
                // 빌드된 JAR 파일을 배포 환경으로 복사
                sh 'cp backend/trip-service/build/libs/trip-service.jar /path/to/deployment/directory/'
                
                // 배포 스크립트 실행 (예: Docker 컨테이너에 배포)
                sh 'bash deploy.sh'
            }
        }
    }
}
