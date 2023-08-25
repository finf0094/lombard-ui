export interface CustomerFormData {
    iin: string;
    fullname: string;
    passNumber: number;
    phone_number: string;
    city: string;
    address: string;
    birthDate: string;
    dateOfIssue: string;
    email: string;
}

export interface ProductFormData {
    condition: string;
    productType: string;
    category: string;
    model: string;
    memory: string;
    packaging: boolean;
    serialNumber: string | null;
    imei: number;
    description: string;
    days: number;
    sum: number;
    confirmSum: number;
}

export interface TicketData {
    client: CustomerFormData
    product: ProductFormData
}


export interface ProductFormDataResponse {
    condition: string;
    productType: string;
    category: string;
    model: string;
    memory: string;
    packaging: boolean;
    serialNumber: string | null;
    imei: number;
    description: string;
    days: number;
    sum: number;
    confirmSum: number;
    today: Date; 
    lastPaymentDate: Date | null;
    sumToBuyout: number;
}

interface contractStatus {
    id: number,
    name: string
}

export interface FormedContractDataResponse {
    id: number,
    contractStatus: contractStatus
    client: CustomerFormData,
    product: ProductFormDataResponse
}