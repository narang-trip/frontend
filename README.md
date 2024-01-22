## 1. Commit Convention
 :clipboard: Form 
 
	> Type: [Subject] <- 변경 사항에 대한 짧은 요약
	> 
	> [Body] <- 무엇을, 왜 변경했는지 설명
	> 
	> [Footer] <- 이슈 트래커
	
:pushpin: Example

 	> Feat: "회원 가입 기능 구현"
	> 
	> 로그인에 필요한 회원 정보를 등록하기 위해 소셜 계정을 회원으로 등록 할 수 있게 함.
	> 
	> Resolved: #123
		Ref: #456
		Related to: #48, #45




### 1.1 태그 유형
|Tag            |Description					|
|---------------|-------------------------------|
|Feat 			|`새로운 기능을 추가하는 경우`     |
|Fix 			|`버그를 고친 경우`           	|
|Docs  			|`문서를 수정한 경우` 		    |
|Style 			|`코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는 경우`	|
|Refactor 		|`코드 리펙토링`  			    |
|Test  			|`테스트 코드` 				    |
|Rename			|`파일명(or 폴더명)을 수정한 경우` |
|Remove 		|`코드(파일)의 삭제가 있을 때`     |
|Comment  		|`필요한 주석 추가 및 변경`    	|

### 1.2 이슈 트래커 유형
|Tag            |Description							|
|---------------|-------------------------------|
|Fixes 			|`이슈 수정 중(아직 해결되지 않은 경우)`     |
|Resolves 		|`이슈를 해결했을 때 사용`        	|
|Ref   			|`참고할 이슈가 있을 때 사용` 		    |
|Related to 	|`해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)`	|	


## 2. Git Flow
>   **feature > develop > release > hotfix > master**
-   위 순서들은 왼쪽으로 갈수록 포괄적인 가지이며 master branch를 병합할 경우 그 왼쪽에 있는 hotfix 등 모든 가지들에 있는 커밋들도 병합하도록 구성하게 된다.
-   5가지 중, **항시 유지되는 메인 브랜치 master, develop**  2가지와 **merge 되면 사라지는 보조 브랜치 feature, release, hotfix** 3가지로 구성된다.


|Branch            |Description							|
|---------------|-------------------------------|
|master  			|`라이브 서버에 제품으로 출시되는 브랜치`     |
|develop 		|`다음 출시 버전을 대비하여 개발하는 브랜치`        	|
|feature   			|`추가 기능 개발 브랜치. develop 브랜치에 들어간다` 		    |
|release 	|`다음 버전 출시를 준비하는 브랜치. develop 브랜치를 release 브랜치로 옮긴 후 QA, 테스트를 진행하고 master 브랜치로 합친다`	|	
|hotfix    			|`master 브랜치에서 발생한 버그를 수정하는 브랜치` 		    |
