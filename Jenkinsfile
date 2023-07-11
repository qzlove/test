pipeline {
    agent any
    stages {
        stage('Build') {
            steps {  // window 使用 bat， linux 使用 sh
                bat 'npm i'
                bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                bat 'xcopy .\\build\\* D:\\1important\\project\\dev1\\test\\dist\\ /s/e/y' // 静态资源目录
            }
        }
    }
}
