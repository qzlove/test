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
                            configName: 'Alibaba Cloud Elastic Compute Service',
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'D:/1important/project/dev1/test/dist/*',
                                    execCommand: 'echo 成功部署到云服务',
                                    remoteDirectory: 'root@:8.134.177.223/usr/local/test'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}
