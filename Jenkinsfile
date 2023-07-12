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
                                    // execTimeout: 120000,
                                    flatten: false, // 只上传文件，不创建目录（除了远程目录）
                                    // makeEmptyDirs: false, // 启用 makeEmptyDirs 可能会在远程服务器上创建大量的空目录，因此应该根据需要谨慎使用。如果您只想创建指定的目录及其所需的父目录，而不想创建空目录，可以将 makeEmptyDirs 设置为 false。当 makeEmptyDirs 设置为 true 时，发布器会在远程服务器上创建空目录，以确保所有指定的目录都存在。当 makeEmptyDirs 设置为 false 时，发布器会只创建指定的目录及其所需的父目录，而不会创建空目录。
                                    // noDefaultExcludes: false, // 设置为 true 时，发布器将不会使用默认的文件排除规则，而会上传所有匹配的文件和子目录，包括隐藏文件和子目录。当 noDefaultExcludes 设置为 false 时，发布器将使用默认的文件排除规则，排除指定的文件和子目录，例如 .git 目录和 .svn 目录等。
                                    // patternSeparator: '[, ]+',
                                    remoteDirectorySDF: false, // 发布器是否将在远程服务器上创建日期格式化的目录，如/usr/local/test/2023/07/12/
                                    // removePrefix: '', // 用于控制发布器在上传文件时是否删除本地文件路径的前缀
                                    // excludes: '',
                                    sourceFiles: 'dist/**',
                                    remoteDirectory: '/usr/local/test',
                                    // execCommand: 'mv dist/** /usr/local/test && rm -rf dist && echo "Files transferred successfully"',
                                    execCommand: 'ls dist',
                                )
                            ],
                            usePromotionTimestamp: false, // 用于控制发布器在上传文件时是否使用推广时间戳作为文件名的一部分
                            useWorkspaceInPromotion: false, // 用于控制发布器在上传文件时是否使用 Jenkins 工作区路径作为文件名的一部分
                            verbose: true, // 显示日志
                        )
                    ]
                )
            }
        }
    }
}
