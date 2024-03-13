pipeline {
agent {
  label 'slave-1'
      }
environment {
      PATH = "/opt/sonar-scanner/bin:$PATH"
    }
stages{
    // Code quality checks
    stage('SonarQube analysis for Feature-Branch') {
            when {
                  expression {return (env.CHANGE_BRANCH ==~ /^(feature|fix|hotfix)\/.*$/) && env.CHANGE_TARGET == 'master' }
             }
            steps {
                   //withSonarQubeEnv('SCHOOL_SONAR_HOST_URL') {
                    //sh 'sonar-scanner -Dsonar.projectKey=erp-customfield-service -Dsonar.projectName="erp-customfield-service" -Dsonar.qualitygate.wait=true -Dsonar.login=560aaffc677746a4f4c9aa88811fa3a1cdf0c324'       
                    echo "Auto mergening"
                    echo "SOURCE_BRANCH: ${env.CHANGE_BRANCH } ----> TARGET_BRANCH: ${env.CHANGE_TARGET}"
                    sh 'rm -rf  erp-customfield-service'
                    sh 'git clone git@bitbucket.org-harsha-anadariya:solutionanalystspvtltd/erp-customfield-service.git'
                    dir('erp-customfield-service')
                    {
                    sh 'git fetch origin'
                    sh 'git branch -a' 
                    sh 'git config --global user.email harsha.anadariya@solutionanalysts.com'
                    sh 'git config --global user.name harsha'
                    sh 'git checkout $CHANGE_TARGET' 
                    sh 'git merge origin/$CHANGE_BRANCH'
                    sh 'git push origin $CHANGE_TARGET'
            }
            }
        }
   
    stage('Build for dev') {
        when {
            branch 'master'
        }
        steps {
            withAWS(credentials: 'School-erp', region: 'ap-south-1') {
                   sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 535693658748.dkr.ecr.ap-south-1.amazonaws.com"
                   sh "docker build -t erp-customfield-service-development ."
                   sh "docker tag erp-customfield-service-development:latest 535693658748.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-development:latest"
                   sh "docker push 535693658748.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-development:latest"
                   sh "docker rmi erp-customfield-service-development:latest"
                   sh "docker rmi 535693658748.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-development:latest"
               }
        }
    }  

    stage('Deploying to dev EKS Cluster') {
        when {
            branch 'master'
        }
        steps {
            withAWS(credentials: 'School-erp', region: 'ap-south-1') {
                   sh "aws eks update-kubeconfig --region ap-south-1 --name School-ERP-Dev-Stage"
                   sh "kubectl apply -f  deployment-master.yaml"
                   sh "kubectl rollout restart deployment school-customfield-deployment -n development"
               }  
        }
    } 

    stage('Build for stage') {
        when {
            branch 'stage'
        }
        steps {
            withAWS(credentials: 'School-erp', region: 'ap-south-1') {
                   sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 535693658748.dkr.ecr.ap-south-1.amazonaws.com"
                   sh "docker build -t erp-customfield-service-stage ."
                   sh "docker tag erp-customfield-service-stage:latest 535693658748.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-stage:latest"
                   sh "docker push 535693658748.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-stage:latest"
                   sh "docker rmi erp-customfield-service-stage"
                   sh "docker rmi 535693658748.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-stage:latest"
               }
        }
    }  

    stage('Deploying to stage EKS Cluster') {
        when {
            branch 'stage'
        }
        steps {
            withAWS(credentials: 'School-erp', region: 'ap-south-1') {
                   sh "aws eks update-kubeconfig --region ap-south-1 --name School-ERP-Dev-Stage"
                   sh "kubectl apply -f  deployment-stage.yaml"
                   sh "kubectl rollout restart deployment school-customfield-deployment -n stage"
               }  
        }
    }
    stage('Build for pre-production') {
        when {
            branch 'preprod'
        }
        steps {
            withAWS(credentials: 'School-erp', region: 'ap-south-1') {
                   sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123558316562.dkr.ecr.ap-south-1.amazonaws.com"
                   sh "docker build -t erp-customfield-service-preprod ."
                   sh "docker tag erp-customfield-service-preprod:latest 123558316562.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-preprod:latest"
                   sh "docker push 123558316562.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-preprod:latest"
                   sh "docker rmi erp-customfield-service-preprod:latest"
                   sh "docker rmi 123558316562.dkr.ecr.ap-south-1.amazonaws.com/erp-customfield-service-preprod:latest"
               }
        }
    }  

    stage('Deploying to pre-production EKS Cluster') {
        when {
            branch 'preprod'
        }
        steps {
            withAWS(credentials: 'School-erp', region: 'ap-south-1') {
                   sh "aws eks update-kubeconfig --region ap-south-1 --name School-erp-preprod-EKS-cluster"
                   sh "kubectl apply -f deployment-preprod.yaml"
                   sh "kubectl rollout restart deployment school-customfield-deployment -n preprod"
               }  
        }
    } 
    stage('Clean Workspace') {
        steps {
            cleanWs()
    }
} 

    }

} 