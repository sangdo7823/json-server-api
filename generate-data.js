const { faker } = require('@faker-js/faker');
const fs = require('fs')
faker.locale = 'vi'
const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const cateList = [];
    Array.from(new Array(n)).forEach(() => {
        const typeId = Math.floor(Math.random() * 2) + 1;
        const cate = {
            id: faker.datatype.uuid(),
            name: typeId == 1 ? faker.commerce.department() : faker.lorem.words(Math.floor(Math.random() * 10) + 1),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            typeId: typeId
        };
        cateList.push(cate);
    });
    return cateList;
};

const randomProductList = (cateList, numberOfProduct) => {
    if (numberOfProduct <= 0) return [];
    const productList = [];
    for (const cate of cateList) {
        if (cate.typeId == 1) {
            Array.from(new Array(numberOfProduct)).forEach(() => {
                const product = {
                    categoryId: cate.id,
                    id: faker.datatype.uuid(),
                    name: faker.commerce.productName(),
                    color: faker.color.human(),
                    price: Number.parseFloat(faker.commerce.price()) ,
                    description: faker.commerce.productDescription(),
                    thumbnailUrl: faker.image.imageUrl(40, 30),
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                };
                productList.push(product);
            });
        }
    }
    return productList;
};
const randomPostList = (cateList, numberOfPost) => {
    if (numberOfPost <= 0) return [];
    const postList = [];
    for (const cate of cateList) {
        if (cate.typeId == 2) {
            Array.from(new Array(numberOfPost)).forEach(() => {
                const product = {
                    categoryId: cate.id,
                    id: faker.datatype.uuid(),
                    title: faker.lorem.words(Math.floor(Math.random() * 10) + 3),
                    author: faker.name.fullName(),
                    description: faker.lorem.paragraph(),
                    imageUrl: faker.image.imageUrl(),
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                };
                postList.push(product);
            });
        }
    }
    return postList;
};
(() => {
    //random db
    const categoryList = randomCategoryList(4);

    const productList = randomProductList(categoryList, 100);

    const postList = randomPostList(categoryList, 100);

    //prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        posts: postList,
        profile: {
            name: "Sang"
        }
    };
    //write db
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data successfully.');
    });
})();