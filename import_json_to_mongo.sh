#!/bin/bash

# Thư mục chứa các file JSON
DATASET_DIR="./dataset"

# Tên container MongoDB (thay thế bằng tên container của bạn)
MONGO_CONTAINER="mongodb"

# Tên database trong MongoDB
DATABASE="pcpartpicker"

# Duyệt qua từng file JSON trong thư mục dataset
for file in "$DATASET_DIR"/*.json; do
    # Lấy tên file không có phần mở rộng (.json) để làm tên bảng
    filename=$(basename "$file" .json)
    
    echo "Copying $file to container..."
    
    # Copy file JSON vào container trước
    docker cp "$file" "$MONGO_CONTAINER:/tmp/$(basename "$file")"
    
    # Đợi một chút để đảm bảo file được copy hoàn tất
    sleep 1
    
    echo "Importing $file into collection $filename..."
    
    # Sử dụng mongoimport để import file JSON vào MongoDB
    docker exec -i "$MONGO_CONTAINER" mongoimport --db "$DATABASE" --collection "$filename" --file "/tmp/$(basename "$file")" --jsonArray
done

# Xóa các file tạm trong container sau khi import
docker exec "$MONGO_CONTAINER" rm -f /tmp/*.json

echo "Import completed!"