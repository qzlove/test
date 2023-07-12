// windows使用bat， linux使用sh
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat 'C:\Users\Mr_Q\AppData\Local\Yarn\bin\cnpm i'
                bat 'npm run build'
            }
        }
        stage('Create or Clear Directory') {
            steps {
                bat '''
                    set "dir_path=D:\\1important\\project\\dev1\\test\\dist"

                    if not exist "%dir_path%" (
                        mkdir "%dir_path%"
                    )

                    del /q "%dir_path%\\*.*"
                '''
            }
        }
        stage('Deploy') {
            steps {
                bat 'xcopy .\\dist\\* D:\\1important\\project\\dev1\\test\\dist /s/e/y'
            }
        }
    }
}
