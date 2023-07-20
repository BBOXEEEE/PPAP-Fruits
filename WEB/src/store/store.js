import { create } from 'zustand';
import { URL } from '../api/server';
import axios from 'axios';
import { fruits_data } from '../static/fruits';

export const useAuthStore = create((set) => ({
    id: '',
    customerName: '',
    setCustomerName: (customerName) => set({ customerName: customerName }),
    setId: (id) => set({ id: id }),
}));

export const useCustomerProductStore = create((set) => ({
    products: [],
    fetchProducts: async (storeName) => {
        const response = await axios.get(
            `${URL}/product/customer/${storeName}`
        );
        const data = response.data;
        // data의 각 요소에 key값 추가
        data.forEach((product) => {
            product.key = product.PRODUCT_NUM;
        });
        set({ products: data });
    },
}));

export const useCustomerStore = create((set) => ({
    user: {
        ID: '',
    },
    order: [],
    setUser: (user) => set({ user: user }),
    fetchUser: async (id) => {
        const response = await axios.get(`${URL}/customer/${id}`);
        const data = response.data;
        set({ user: data });
    },
    fetchOrder: async (id) => {
        const response = await axios.get(`${URL}/ordered/customer/${id}`);
        const data = response.data;
        set({ order: data });
    },
}));

export const useOwnerStore = create((set) => ({
    owner: {
        ID: 'RHI',
        OWNER_NAME: 'RHIn',
    },
    ownerInfo: {},
    stores: [],
    currentStore: {
        STORE_NAME: '',
        LOCATION: '',
        TEL: '',
    },

    fetchOwner: async (id) => {
        const response = await axios.get(`${URL}/owner/${id}`);
        const data = response.data;
        set({ ownerInfo: data });
    },

    setOwner: (owner) => set({ owner: owner }),

    getOwnerSession: async (id) => {
        const owner = sessionStorage.getItem('owner');
        console.log('owner', owner);
        if (owner) {
            // RHI면 안하도록
            if (JSON.parse(owner).ID === 'RHI') return;
            set({ owner: JSON.parse(owner) });

            // currentStore 값을 아이디로 요청
            const response = await axios.get(
                `${URL}/store/owner/${JSON.parse(owner).ID}`
            );
            const data = response.data;
            // data의 각 요소에 key값 추가
            data.forEach((store, idx) => {
                store.key = idx;
            });
            set({ stores: data });
            console.log('data', data);
            set({ currentStore: data[0] });
        }
    },

    setCurrentStore: (store) => {
        // 세션에도 저장
        if (store) {
            sessionStorage.setItem('currentStore', JSON.stringify(store));
            console.log('session store', store);
            set({ currentStore: store });
        }
    },

    getCurrentStore: () => {
        const currentStore = sessionStorage.getItem('currentStore');
        console.log('getCurrstore', currentStore);
        if (currentStore !== undefined) {
            set({ currentStore: JSON.parse(currentStore) });
        }
    },

    setCurrentStoreName: (storeName) =>
        set((state) => ({
            currentStore: {
                ...state.currentStore,
                STORE_NAME: storeName,
            },
        })),

    fetchStores: async (ownerId) => {
        const response = await axios.get(`${URL}/store/owner/${ownerId}`);
        const data = response.data;
        // data의 각 요소에 key값 추가
        data.forEach((store, idx) => {
            store.key = idx;
        });
        set({ stores: data });
    },
    addStore: async (store) => {
        const response = await axios.post(`${URL}/store`, store);
        const data = response.data;
        const newData = {
            STORE_NAME: store.name,
            LOCATION: store.location,
            TEL: store.tel,
        };
        set((state) => ({
            stores: [...state.stores, newData],
        }));
    },

    removeStore: (keys) =>
        set((state) => ({
            stores: state.stores.filter((store) => !keys.includes(store.key)),
        })),
    changeSTORE_STATUS: (keys, status) =>
        set((state) => ({
            stores: state.stores.map((store) =>
                keys.includes(store.key) ? { ...store, status: status } : store
            ),
        })),
}));

// 매출 관리
export const useSalesStore = create((set) => ({
    sales: [],
    fetchSales: async (storeName) => {
        const response = await axios
            .get(`${URL}/sales/store/${storeName}`)
            .then((response) => {
                const data = response.data;
                // data의 각 요소에 key값 추가
                data.forEach((sale, idx) => {
                    sale.key = idx;
                });
                set({ sales: data });
            })
            .catch((error) => {
                set({ sales: [] });
            });
    },
    addSale: (sale) =>
        set((state) => ({
            sales: [...state.sales, sale],
        })),
    removeSale: (keys) =>
        set((state) => ({
            sales: state.sales.filter((sale) => !keys.includes(sale.key)),
        })),
    changeSALE_STATUS: (keys, status) =>
        set((state) => ({
            sales: state.sales.map((sale) =>
                keys.includes(sale.key) ? { ...sale, status: status } : sale
            ),
        })),
}));

// 상품 관리
export const useProductStore = create((set, get) => ({
    currProduct: {},
    products: [],
    fetchProducts: async (storeName, pid) => {
        const response = await axios.get(`${URL}/product/owner/${storeName}`);
        const data = response.data;

        // data의 각 요소에 key값 추가
        data.forEach((product) => {
            product.key = product.PRODUCT_NUM;
        });
        if (pid) {
            const name = data.find(
                (product) => product.PRODUCT_NUM == pid
            )?.PRODUCT_NAME;
            const desc = fruits_data.find(
                (product) => product.FRUITS_NAME == name
            )?.FRUITS_DESC;

            const img = fruits_data.find(
                (product) => product.FRUITS_NAME == name
            )?.IMAGE;

            const cp = data.find((product) => product.PRODUCT_NUM == pid);
            const currProduct = {
                ...cp,
                PRODUCT_DESC: desc,
                IMAGE_URL: img,
            };
            set({ currProduct: currProduct });
        }

        set({ products: data });
    },

    addProduct: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),
    removeProduct: async (products) => {
        const response = await axios
            .post(`${URL}/product/return`, products)
            .then((response) => {
                set((state) => ({
                    products: state.products.filter(
                        (product) => !products.includes(product.key)
                    ),
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    },

    changePRODUCT_STATUS: (keys, status) =>
        set((state) => ({
            products: state.products.map((product) =>
                keys.includes(product.key)
                    ? { ...product, status: status }
                    : product
            ),
        })),
}));

// 발주 관리
export const useOrderStore = create((set) => ({
    orders: [],
    orderHistory: [],
    fetchOrders: async (storeName) => {
        console.log('Ftech order');
        const response = await axios.get(`${URL}/supply/store/${storeName}`);
        const data = response.data;
        // data의 각 요소에 key값 추가
        data.forEach((order) => {
            order.key = order.SUPPLY_NUM;
        });
        set({ orders: data });
    },
    postProduct: async (req) => {
        const { store_name, fruits_name, quantity } = req;
        console.log(store_name, fruits_name, quantity);
        axios
            .post(`${URL}/productRegister`, {
                store_name: store_name,
                fruits_name: fruits_name,
                quantity: quantity,
            })
            .then((response) => {
                console.log('response', response);
                // orderHistory에 추가
                set((state) => ({
                    orderHistory: [...state.orderHistory, req],
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    },

    addOrder: async (order) => {
        const response = await axios
            .post(`${URL}/productRegister`, order)
            .then((response) => {
                set((state) => ({
                    orders: [...state.orders, order],
                }));
            });
    },
    removeOrder: (keys) =>
        set((state) => ({
            orders: state.orders.filter((order) => !keys.includes(order.key)),
        })),
    changeORDER_STATUS: (keys, status) =>
        set((state) => ({
            orders: state.orders.map((order) =>
                keys.includes(order.key) ? { ...order, status: status } : order
            ),
        })),
}));

// 가맹점 관리
export const useShopsStore = create((set, get) => ({
    shops: [],
    selectedShop: {
        STORE_NAME: '대전유성점',
        LOCATION: '충청남도 천안시 동남구 병천면 충절로 1600',
        TEL: '041-560-1234',
    },
    currentShopName: '',

    fetchShops: async () => {
        const response = await axios.get(`${URL}/store`);
        const data = response.data;
        // data의 각 요소에 key값 추가
        data.forEach((shop) => {
            shop.key = shop.STORE_NUM;
        });
        set({ shops: data });
    },

    addShop: async (shop) => {
        const response = await axios.post(`${URL}/store`, shop);
        const data = response.data;
        console.log('addshop data', data);
        const newShop = {
            key: shop.name,
            STORE_NAME: shop.name,
            LOCATION: shop.location,
            TEL: shop.tel,
        };
        set((state) => ({
            shops: [...state.shops, newShop],
        }));
    },

    deleteShop: async (shopName) => {
        const response = await axios.delete(`${URL}/store/${shopName}`);
        const data = response.data;
        set((state) => ({
            shops: state.shops.filter((shop) => shop.STORE_NAME !== shopName),
        }));
    },

    editShop: (key, shop) =>
        set((state) => ({
            data: state.data.map((shop) =>
                shop.key === key ? { ...shop, ...shop } : shop
            ),
        })),
}));

// 주문관리
export const useAdminPurchaseStore = create((set) => ({
    purchases: [],
    fetchPurchases: async (storeName) => {
        console.log('fetchPusrchase', storeName);
        const response = await axios.get(`${URL}/ordered/store/${storeName}`);
        const data = response.data;

        if (data) {
            // data의 각 요소에 key값 추가
            data.forEach((purchase) => {
                purchase.key = purchase.ORDERED_NUM;
            });
            set({ purchases: data });
        } else {
            set({ purchases: [] });
        }
    },
    addPurchase: (purchase) =>
        set((state) => ({
            purchases: [...state.purchases, purchase],
        })),
    removePurchase: (keys) =>
        set((state) => ({
            purchases: state.purchases.filter(
                (purchase) => !keys.includes(purchase.key)
            ),
        })),
    changePURCHASE_STATUS: (keys, status) =>
        set((state) => ({
            purchases: state.purchases.map((purchase) =>
                keys.includes(purchase.key)
                    ? { ...purchase, status: status }
                    : purchase
            ),
        })),
}));

export const usePurchaseStore = create((set) => ({
    curtomerPurchases: [],
    adminPurchases: [],
    fetchCustomerPurchases: async (id) => {
        const response = await axios.get(`${URL}/ordered/customer/${id}`);
        const data = response.data;
        // data의 각 요소에 key값 추가
        data.forEach((purchase) => {
            purchase.key = purchase.ORDERED_NUM;
        });

        set({ customerPurchases: data });
    },
    fetchAdminPurchases: async (storeName) => {
        const response = await axios.get(`${URL}/ordered/store/${storeName}`);
        const data = response.data;
        // data의 각 요소에 key값 추가
        data.forEach((purchase) => {
            purchase.key = purchase.ORDERED_NUM;
        });

        set({ adminPurchases: data });
    },

    postCustomerPurchase: async (purchase) => {
        const response = await axios.post(`${URL}/productOrder`, purchase);
        const data = response.data;
        console.log('postPurchase data', data);
        set((state) => ({
            curstomerPurchases: [...state.curtomerPurchases, purchase],
        }));
    },
}));

export const useBearStore = create((set) => ({
    shopName: '대전점',
    location: '대전광역시 유성구 엑스포로 325',
    phoneNumber: '042-934-1234',
    // 상품 데이터
    data: [
        {
            key: '1',
            productId: '1',
            name: '사과',
            count: 40,
            price: '1800',
            imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/1327px-Honeycrisp-Apple.jpg',
            description:
                '아삭하고 상쾌한 사과는 자연의 단맛과 톡 쏘는 맛이 완벽하게 조화를 이루고 있어 육즙이 많은 한입을 먹을 때마다 신선함을 선사합니다.',
            expire: '2023-06-12',
            state: '매우 신선함',
            isForSale: 'true',
        },
        {
            key: '12',
            productId: '1',
            name: '사과',
            count: 20,
            price: '1600',
            imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/1327px-Honeycrisp-Apple.jpg',
            description:
                '아삭하고 상쾌한 사과는 자연의 단맛과 톡 쏘는 맛이 완벽하게 조화를 이루고 있어 육즙이 많은 한입을 먹을 때마다 신선함을 선사합니다.',
            expire: '2023-06-09',
            state: '매우 신선함',
            isForSale: 'true',
        },
        {
            key: '2',
            name: '배',
            count: 40,
            price: '1800',
            imgSrc: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/benefits-of-pears-1296x728-feature.jpg',
            description:
                '섬세하게 달콤하고 놀랍도록 육즙이 풍부한 배는 거부할 수 없는 풍미와 쉽게 결합되는 감미롭고 부드러운 질감을 제공합니다.',
            expire: '2023-06-12',
            isForSale: 'true',
        },
        {
            key: '3',
            name: '아보카도',
            count: 40,
            price: '1800',
            imgSrc: 'https://img.asiatoday.co.kr/file/2019y/11m/18d/20191118001127351_1574044323_1.jpg',
            description:
                '크리미하고 다재다능한 아보카도는 건강한 지방의 보물창고로, 상쾌한 시원함과 버터 같은 풍부함을 제공하여 어떤 요리든 품격을 높여줍니다.',
            expire: '2023-06-12',
            isForSale: 'true',
        },
        {
            key: '4',
            name: '오렌지',
            count: 40,
            price: '1800',
            imgSrc: 'https://www.fsnews.co.kr/news/photo/201807/30082_25377_1226.jpg',
            description:
                '생생한 시트러스 향이 나는 오렌지는 자연적인 단맛과 상쾌한 톡 쏘는 맛의 균형을 이루고 상쾌한 경험을 제공하여 활력을 줍니다.',
            expire: '2023-06-12',
            isForSale: 'true',
        },
    ],
    // 매출 데이터
    salesData: [
        {
            id: '1',
            date: '2023-05-30',
            price: 2000,
        },
        {
            id: '2',
            date: '2023-05-29',
            price: 10000,
        },
        {
            id: '3',
            date: '2023-05-31',
            price: 10000,
        },
        {
            id: '4',
            date: '2023-05-28',
            price: 10000,
        },
    ],
    // 발주 데이터(우리가 농장에 주문 넣은)
    orderData: [],
    // 주문 데이터(소비자가 우리 서비스에 주문한)
    purchaseData: [
        {
            id: '1',
            productId: '1',
            date: '2023-05-30',
            count: 10,
        },
        {
            id: '2',
            productId: '2',
            date: '2023-05-29',
            count: 2,
        },
        {
            id: '3',
            productId: '3',
            date: '2023-05-31',
            count: 50,
        },
        {
            id: '4',
            productId: '4',
            date: '2023-05-28',
            count: 3,
        },
    ],
    myShops: [
        {
            id: '1',
            name: '대전점',
            address: '대전시 유성구',
        },
    ],
    // 상품 데이터 CRUD
    addNewItem: (newItem) => {
        set((state) => ({ data: [...state.data, newItem] }));
    },
    removeItem: (key) => {
        if (key.length > 1) {
            set((state) => ({
                data: state.data.filter((item) => !key.includes(item.key)),
            }));
        } else {
            set((state) => ({
                data: state.data.filter((item) => item.key !== key[0]),
            }));
        }
    },

    editItem: (key, editedItem) =>
        set((state) => ({
            data: state.data.map((item) =>
                item.key === key ? editedItem : item
            ),
        })),

    // 상품의 판매여부 isForSale 변경
    changeIsForSale: (key, isForSale) => {
        if (key.length > 1) {
            set((state) => ({
                data: state.data.map((item) =>
                    key.includes(item.key)
                        ? { ...item, isForSale: isForSale }
                        : item
                ),
            }));
        } else {
            key = key[0];
            set((state) => ({
                data: state.data.map((item) =>
                    item.key === key ? { ...item, isForSale: isForSale } : item
                ),
            }));
        }
    },

    // 발주 데이터 CRUD
    addNewOrder: (newOrder) => {
        set((state) => ({ orderData: [...state.orderData, newOrder] }));
    },
    removeOrder: (key) => {
        if (key.length > 1) {
            set((state) => ({
                orderData: state.orderData.filter(
                    (item) => !key.includes(item.key)
                ),
            }));
        } else {
            set((state) => ({
                orderData: state.orderData.filter(
                    (item) => item.key !== key[0]
                ),
            }));
        }
    },
}));

// 지출 관리
export const useExpenseStore = create((set) => ({
    // 지출 데이터
    expenseData: [],

    fetchExpenseData: async (storeName) => {
        const response = await axios
            .get(`${URL}/expend/store/${storeName}`)
            .then((res) => {
                console.log('fetchExpenseData!', res);
                set((state) => ({ expenseData: res.data }));
            })
            .catch((err) => {
                console.log(err);
            });
    },
}));

// 날짜 관리
export const useDateStore = create((set) => ({
    // 현재 날짜
    currentDate: new Date(),
    // 현재 날짜 변경
    changeNextDay: async (cd) => {
        const currDate = new Date(cd.getTime());
        const response = await axios
            .put(`${URL}/nextDay`, {
                today: currDate,
            })
            .then((res) => {
                console.log('nextDAy!', res);
                set((state) => ({ currentDate: new Date(res.data) }));
            })
            .catch((err) => {
                console.log(err);
            });
    },
}));

export const PRODUCT_DATA = [
    {
        productId: '1',
        productName: '사과',
        price: '1500',
    },
    {
        productId: '2',
        productName: '바나나',
        price: '6000',
    },
    {
        productId: '3',
        productName: '포도',
        price: '4000',
    },
    {
        productId: '4',
        productName: '오렌지',
        price: '1200',
    },
    {
        productId: '5',
        productName: '딸기',
        price: '10000',
    },
    {
        productId: '6',
        productName: '체리',
        price: '6000',
    },
    {
        productId: '7',
        productName: '수박',
        price: '7000',
    },
    {
        productId: '8',
        productName: '멜론',
        price: '8000',
    },
    {
        productId: '9',
        productName: '멜론',
        price: '700',
    },
    {
        productId: '10',
        productName: '파인애플',
        price: '5000',
    },
    {
        productId: '11',
        productName: '복숭아',
        price: '2000',
    },
    {
        productId: '12',
        productName: '망고',
        price: '5000',
    },
    {
        productId: '13',
        productName: '배',
        price: '2000',
    },
    {
        productId: '14',
        productName: '귤',
        price: '600',
    },
    {
        productId: '15',
        productName: '레몬',
        price: '1000',
    },
    {
        productId: '16',
        productName: '키위',
        price: '1000',
    },
    {
        productId: '17',
        productName: '자몽',
        price: '1200',
    },
    {
        productId: '18',
        productName: '코코넛',
        price: '2500',
    },
    {
        productId: '19',
        productName: '자두',
        price: '800',
    },
    {
        productId: '20',
        productName: '살구',
        price: '1100',
    },
    {
        productId: '21',
        productName: '감',
        price: '1000',
    },
    {
        productId: '22',
        productName: '샤인머스켓',
        price: '6000',
    },
    {
        productId: '23',
        productName: '청포도',
        price: '5000',
    },
    {
        productId: '24',
        productName: '토마토',
        price: '900',
    },
    {
        productId: '25',
        productName: '방울토마토',
        price: '2800',
    },
    {
        productId: '26',
        productName: '리치',
        price: '3000',
    },
    {
        productId: '27',
        productName: '한라봉',
        price: '2000',
    },
    {
        productId: '28',
        productName: '골드키위',
        price: '1500',
    },
    {
        productId: '29',
        productName: '블루베리',
        price: '11000',
    },
    {
        productId: '30',
        productName: '석류',
        price: '1200',
    },
    {
        productId: '31',
        productName: '거봉',
        price: '6800',
    },
];
