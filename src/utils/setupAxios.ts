import fs from "node:fs";
import path from "node:path";

export const setupAxios = async (projectDir: string) => {
	const apiContent = `
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// EXAMPLE AXIOS REQUEST
export const getSomething = async () => {
	const res = await api.get('/something');
	const { data } = res;
	return data;
};
  `;
	fs.writeFileSync(path.join(projectDir, "src/utils/api.ts"), apiContent);

	const envExampleContent = "VITE_API_URL=your_api_url_here";
	fs.writeFileSync(path.join(projectDir, ".env.example"), envExampleContent);
};
