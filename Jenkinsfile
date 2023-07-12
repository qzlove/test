// windows使用bat， linux使用sh
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat 'C:\\Users\\Mr_Q\\AppData\\Local\\Yarn\\bin\\cnpm i'
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
        stage('Deploy to Aliyun') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'b789f74e-379d-442e-b06c-0b97c5cc3081',
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    execCommand: 'cd /usr/local/test && rm -rf * && scp -r D:/1important/project/dev1/test/dist/* /usr/local/test'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}
