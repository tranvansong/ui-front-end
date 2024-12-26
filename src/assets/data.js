// data.js

// Sample product data
export const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: "$29.99",
        stock: 150,
        image: "images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
        id: 2,
        name: "Denim Jeans",
        price: "$89.99",
        stock: 80,
        image: "images.unsplash.com/photo-1542272454315-4c01d7abdf4a",
    },
    {
        id: 3,
        name: "Summer Dress",
        price: "$59.99",
        stock: 45,
        image: "images.unsplash.com/photo-1496747611176-843222e1e57c",
    },
];

// Sample order data
export const orders = [
    {
        id: "#ORD001",
        customer: "John Doe",
        status: "Delivered",
        amount: "$129.99",
        date: "2024-02-10",
    },
    {
        id: "#ORD002",
        customer: "Jane Smith",
        status: "Processing",
        amount: "$89.99",
        date: "2024-02-09",
    },
    {
        id: "#ORD003",
        customer: "Mike Johnson",
        status: "Pending",
        amount: "$159.99",
        date: "2024-02-08",
    },
];

// Sample analytics data
export const analytics = {
    totalSales: "$15,489",
    totalOrders: 156,
    averageOrder: "$99.29",
    conversion: "3.2%",
};

// https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/1695625858562-370559332_2038835899783718_5144271391318526711_n.jpg?alt=media
export const mockProducts = [
    {
        "id": 1,
        "name": "Áo thun nam",
        "description": "Áo thun 100% cotton, thoáng mát và thoải mái.",
        "category": "Áo thun",
        "brand": "Nike",
        "price": 100000.0,
        "soldQuantity": 0,
        "averageRating": 4.5,
        "colors": [
            {
                "id": 1,
                "color": "Đen",
                "colorCode": "#000000",
                "images": [
                    {
                        "id": 2,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    },
                    {
                        "id": 1,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    }
                ],
                "variants": [
                    {
                        "id": 2,
                        "sku": "ATNĐENL",
                        "size": "L",
                        "stockQuantity": 100,
                        "soldQuantity": 20
                    },
                    {
                        "id": 1,
                        "sku": "ATNĐENM",
                        "size": "M",
                        "stockQuantity": 50,
                        "soldQuantity": 10
                    }
                ]
            },
            {
                "id": 2,
                "color": "Trắng",
                "colorCode": "#FFFFFF",
                "images": [
                    {
                        "id": 4,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    },
                    {
                        "id": 3,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    }
                ],
                "variants": [
                    {
                        "id": 4,
                        "sku": "ATNTRANGL",
                        "size": "L",
                        "stockQuantity": 20,
                        "soldQuantity": 5
                    },
                    {
                        "id": 3,
                        "sku": "ATNTRANGM",
                        "size": "M",
                        "stockQuantity": 40,
                        "soldQuantity": 5
                    }
                ]
            }
        ],
        "reviews": [
            {
                "id": 6,
                "username": "songtran02@gmail.com",
                "rating": 5,
                "comment": "San pham rat tot",
                "createdAt": "08:55:20 04/11/2024"
            },
            {
                "id": 7,
                "username": "songtran02@gmail.com",
                "rating": 4,
                "comment": "San pham hoi tot",
                "createdAt": "09:25:58 04/11/2024"
            }
        ]
    },
    {
        "id": 2,
        "name": "Áo thun nam 2",
        "description": "Áo thun 100% cotton, thoáng mát và thoải mái.",
        "category": "Áo thun",
        "brand": "Nike",
        "price": 200000.0,
        "soldQuantity": 0,
        "averageRating": 0.0,
        "colors": [
            {
                "id": 1,
                "color": "Đen",
                "colorCode": "#000000",
                "images": [
                    {
                        "id": 6,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    },
                    {
                        "id": 5,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    }
                ],
                "variants": [
                    {
                        "id": 6,
                        "sku": "ATN2ĐENXL",
                        "size": "XL",
                        "stockQuantity": 100,
                        "soldQuantity": 20
                    },
                    {
                        "id": 5,
                        "sku": "ATN2ĐENM",
                        "size": "M",
                        "stockQuantity": 50,
                        "soldQuantity": 10
                    }
                ]
            },
            {
                "id": 2,
                "color": "Trắng",
                "colorCode": "#FFFFFF",
                "images": [
                    {
                        "id": 8,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    },
                    {
                        "id": 7,
                        "image": "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media"
                    }
                ],
                "variants": [
                    {
                        "id": 8,
                        "sku": "ATN2TRANG2XL",
                        "size": "2XL",
                        "stockQuantity": 20,
                        "soldQuantity": 5
                    },
                    {
                        "id": 7,
                        "sku": "ATN2TRANGM",
                        "size": "M",
                        "stockQuantity": 40,
                        "soldQuantity": 10
                    }
                ]
            }
        ],
        "reviews": []
    }
]

export const cart = {
    cartId: 3,
    userId: 3,
    totalPrice: 5750000,
    cartItemsResponse: [
        {
            cartItemId: 39,
            product: {
                id: 26,
                name: "Áo sơ mi dài tay Oxford",
                price: 1150000.0,
                soldQuantity: 23,
                averageRating: 2.7,
                colors: [
                    {
                        id: 9,
                        color: "Xanh da trời",
                        colorCode: "#ADD8E6",
                        images: [
                            {
                                id: 238,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/dcfcc8d2-82fe-403c-a85f-b08907cc295a.jfif?alt=media",
                            },
                            {
                                id: 239,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/5090331b-31ee-4fa3-a419-e6c3c38a9fa4.jfif?alt=media",
                            },
                            {
                                id: 240,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media",
                            },
                            {
                                id: 241,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/3883553f-d226-495a-819d-48c0726b6235.jfif?alt=media",
                            },
                            {
                                id: 242,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/913085e8-a966-42c4-86d3-cc8e445b2281.jfif?alt=media",
                            },
                            {
                                id: 243,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/526b43e0-b933-4f2b-824a-d505c3097283.jfif?alt=media",
                            },
                        ],
                        variants: [
                            {
                                id: 200,
                                sku: "ASMDT-L-09",
                                size: "L",
                                stockQuantity: 35,
                                soldQuantity: 10,
                            },
                            {
                                id: 201,
                                sku: "ASMDT-XL-09",
                                size: "XL",
                                stockQuantity: 25,
                                soldQuantity: 8,
                            },
                            {
                                id: 202,
                                sku: "ASMDT-2XL-09",
                                size: "2XL",
                                stockQuantity: 15,
                                soldQuantity: 5,
                            },
                        ],
                    },
                ],
            },
            colorId: 9,
            variantId: 200,
            size: "L",
            quantity: 2,
            price: 1150000.0,
        },
        {
            cartItemId: 40,
            product: {
                id: 26,
                name: "Áo sơ mi dài tay Oxford",
                price: 1150000.0,
                soldQuantity: 23,
                averageRating: 2.7,
                colors: [
                    {
                        id: 9,
                        color: "Xanh da trời",
                        colorCode: "#ADD8E6",
                        images: [
                            {
                                id: 238,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/dcfcc8d2-82fe-403c-a85f-b08907cc295a.jfif?alt=media",
                            },
                            {
                                id: 239,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/5090331b-31ee-4fa3-a419-e6c3c38a9fa4.jfif?alt=media",
                            },
                            {
                                id: 240,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/946c08ad-73cc-42be-afd4-02462982c33c.jfif?alt=media",
                            },
                            {
                                id: 241,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/3883553f-d226-495a-819d-48c0726b6235.jfif?alt=media",
                            },
                            {
                                id: 242,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/913085e8-a966-42c4-86d3-cc8e445b2281.jfif?alt=media",
                            },
                            {
                                id: 243,
                                image:
                                    "https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/526b43e0-b933-4f2b-824a-d505c3097283.jfif?alt=media",
                            },
                        ],
                        variants: [
                            {
                                id: 200,
                                sku: "ASMDT-L-09",
                                size: "L",
                                stockQuantity: 35,
                                soldQuantity: 10,
                            },
                            {
                                id: 201,
                                sku: "ASMDT-XL-09",
                                size: "XL",
                                stockQuantity: 25,
                                soldQuantity: 8,
                            },
                            {
                                id: 202,
                                sku: "ASMDT-2XL-09",
                                size: "2XL",
                                stockQuantity: 15,
                                soldQuantity: 5,
                            },
                        ],
                    },
                ],
            },
            colorId: 9,
            variantId: 202,
            size: "2XL",
            quantity: 3,
            price: 1150000.0,
        },
    ],
};

export const mockColors = [
    {
        "id": 1,
        "color": "Đen",
        "colorCode": "#000000"
    },
    {
        "id": 2,
        "color": "Trắng",
        "colorCode": "#FFFFFF"
    },
    {
        "id": 3,
        "color": "Xanh navy",
        "colorCode": "#000080"
    },
    {
        "id": 4,
        "color": "Hồng",
        "colorCode": "#FFB6C1"
    },
    {
        "id": 5,
        "color": "Xám",
        "colorCode": "#D3D3D3"
    },
    {
        "id": 6,
        "color": "Ngọc lam",
        "colorCode": "#30D5C8"
    },
    {
        "id": 7,
        "color": "Be",
        "colorCode": "#F5F5DC"
    },
    {
        "id": 8,
        "color": "Xanh lá cây",
        "colorCode": "#008000"
    },
    {
        "id": 9,
        "color": "Xanh da trời",
        "colorCode": "#ADD8E6"
    },
    {
        "id": 10,
        "color": "Nâu",
        "colorCode": "#964B00"
    },
    {
        "id": 11,
        "color": "Vàng",
        "colorCode": "#FFFF00"
    },
    {
        "id": 12,
        "color": "Đỏ",
        "colorCode": "#FF0000"
    },
    {
        "id": 13,
        "color": "Xanh bóng đêm",
        "colorCode": "#004953"
    },
    {
        "id": 14,
        "color": "Đỏ sẫm",
        "colorCode": "#380606"
    }
];

export const mockBrands = [
    {
        "id": 1,
        "brand": "Adidas"
    },
    {
        "id": 3,
        "brand": "Nike"
    },
    {
        "id": 5,
        "brand": "Coolmate"
    },
    {
        "id": 6,
        "brand": "Puma"
    }
];

export const mockCategories = [
    {
        "id": 1,
        "category": "Áo thun"
    },
    {
        "id": 2,
        "category": "Quần dài"
    },
    {
        "id": 3,
        "category": "Áo khoác"
    },
    {
        "id": 4,
        "category": "Áo Polo"
    },
    {
        "id": 5,
        "category": "Áo dài tay"
    },
    {
        "id": 6,
        "category": "Áo hoodie"
    },
    {
        "id": 8,
        "category": "Áo sơ mi"
    },
    {
        "id": 9,
        "category": "Quần short"
    }
]

export const mockOrders = [
    {
        "orderId": 2,
        "orderCode": "ORD1733625031",
        "status": "PENDING",
        "totalPayment": 4950000,
        "receiverName": "Tran Van Song",
        "phoneNumber": "0987815002",
        "email": "songtran02@gmail.com",
        "address": "Thac Qua Xã Chiềng Chung, Huyện Mai Sơn, Tỉnh Sơn La",
        "orderMethod": "cod",
        "shippingMethod": "express",
        "orderDate": "2024-12-08T09:30:31",
        "cancelDate": null,
        "orderItemsResponse": [
            {
                "id": 4,
                "productId": 11,
                "productName": "Áo khoác Golf COLD.RDY",
                "imageUrl": "https://example.com/image1.jpg",
                "color": "Trắng",
                "size": "XL",
                "quantity": 1,
                "price": 2000000
            }
        ]
    },
    {
        "orderId": 3,
        "orderCode": "ORD1733625032",
        "status": "SHIPPED",
        "totalPayment": 3500000,
        "receiverName": "Nguyen Thi Hoa",
        "phoneNumber": "0975643211",
        "email": "hoa.nguyen@gmail.com",
        "address": "22B Đường Láng, Quận Đống Đa, Hà Nội",
        "orderMethod": "online_payment",
        "shippingMethod": "standard",
        "orderDate": "2024-12-09T14:15:00",
        "cancelDate": null,
        "orderItemsResponse": [
            {
                "id": 5,
                "productId": 15,
                "productName": "Giày chạy bộ Ultraboost",
                "imageUrl": "https://example.com/image2.jpg",
                "color": "Đen",
                "size": "42",
                "quantity": 1,
                "price": 3000000
            },
            {
                "id": 6,
                "productId": 16,
                "productName": "Tất thể thao Performance",
                "imageUrl": "https://example.com/image3.jpg",
                "color": "Xám",
                "size": "Free Size",
                "quantity": 2,
                "price": 250000
            }
        ]
    },
    {
        "orderId": 4,
        "orderCode": "ORD1733625033",
        "status": "CANCELLED",
        "totalPayment": 1200000,
        "receiverName": "Le Van Hung",
        "phoneNumber": "0901234567",
        "email": "hunglv@gmail.com",
        "address": "Số 5, Phố Nhổn, Quận Bắc Từ Liêm, Hà Nội",
        "orderMethod": "cod",
        "shippingMethod": "express",
        "orderDate": "2024-12-07T08:00:00",
        "cancelDate": "2024-12-08T10:00:00",
        "orderItemsResponse": [
            {
                "id": 7,
                "productId": 20,
                "productName": "Balo thời trang Originals",
                "imageUrl": "https://example.com/image4.jpg",
                "color": "Xanh Lá",
                "size": "Medium",
                "quantity": 1,
                "price": 1200000
            }
        ]
    },
    {
        "orderId": 5,
        "orderCode": "ORD1733625034",
        "status": "DELIVERED",
        "totalPayment": 8700000,
        "receiverName": "Pham Minh Long",
        "phoneNumber": "0938987654",
        "email": "longpm@gmail.com",
        "address": "45 Lý Tự Trọng, Phường Bến Thành, Quận 1, TP. HCM",
        "orderMethod": "online_payment",
        "shippingMethod": "express",
        "orderDate": "2024-12-06T15:45:00",
        "cancelDate": null,
        "orderItemsResponse": [
            {
                "id": 8,
                "productId": 25,
                "productName": "Đồng hồ thông minh Galaxy Watch",
                "imageUrl": "https://example.com/image5.jpg",
                "color": "Bạc",
                "size": "One Size",
                "quantity": 1,
                "price": 7500000
            },
            {
                "id": 9,
                "productId": 30,
                "productName": "Tai nghe không dây Buds Pro",
                "imageUrl": "https://example.com/image6.jpg",
                "color": "Đen",
                "size": "One Size",
                "quantity": 1,
                "price": 1200000
            }
        ]
    }
]
