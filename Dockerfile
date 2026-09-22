# Stage 1: Build tài liệu MkDocs bằng Python
FROM python:3.11-slim AS builder

WORKDIR /app

# Cài đặt các thư viện hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Cài đặt MkDocs Material và các thư viện hỗ trợ
RUN pip install --no-cache-dir \
    mkdocs-material \
    pymdown-extensions \
    pdf2image \
    pillow

# Copy toàn bộ mã nguồn vào container
COPY . .

# Loại bỏ khai báo plugin 'pdf2image' không hợp lệ khỏi mkdocs.yml trong lúc build
# (Không làm ảnh hưởng hay thay đổi file code gốc của dự án)
RUN sed -i '/- pdf2image/d' mkdocs.yml

# Build tài liệu ra thư mục HTML tĩnh (/app/site)
RUN mkdocs build

# Stage 2: Phục vụ web bằng Nginx nhẹ chuẩn Production
FROM nginx:alpine

# Copy kết quả build từ Stage 1 sang thư mục mặc định của Nginx
COPY --from=builder /app/site /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]