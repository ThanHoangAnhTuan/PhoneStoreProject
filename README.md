# Các bước lấy project

1. Git clone https://github.com/ThanHoangAnhTuan/PhoneStoreProject.git
2. Tạo nhánh: git branch feature/"YourName"
   vd: git branch feature/Tuan
3. chuyển nhánh: git checkout feature/"YourName"
   vd: git checkout feature/Tuan
4. Viết code trên nhánh của mình

## Sau mỗi ngày làm thì mọi người sẽ merge code của mình lên nhánh develop để sửa config

run: branch checkout develop -> git merge feature/"YourName"

## Nếu bị config thì sửa xong thì push nhánh develop lên

run: branch checkout develop -> git push origin develop

## Sau đó thì chuyển về nhánh của mình là pull code mới nhất về từ develop và làm tiếp

run: git checkout feature/"YourName" -> git pull origin develop

