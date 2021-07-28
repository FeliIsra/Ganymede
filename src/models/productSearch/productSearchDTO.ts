export interface ProductSerachDTO {
	query: string;
	provider: string;
	options?: {
		user: string;
		password: string;
	}
	callbackUrl: string;
}