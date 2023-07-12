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
                            transfers: [
                                sshTransfer(
                                    cleanRemote: true, // 上传前先清空远程路径下的内容
                                    execTimeout: 120000,
                                    flatten: true, // 不在远程路径下新建这里配置sourceFiles里面的dist
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    // patternSeparator: '[, ]+',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    excludes: '',
                                    execCommand: 'echo "Files transferred successfully"',
                                    sourceFiles: 'dist/**',
                                    remoteDirectory: '/usr/local/test'
                                )
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: true, // 显示日志
                        )
                    ]
                )
            }
        }
    }
}
