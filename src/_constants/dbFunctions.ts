import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// 비밀번호 암호화 함수
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // salt 생성 (비밀번호를 더 안전하게 암호화)
    // 비밀번호 암호화
    return await bcrypt.hash(password, salt);
}

export function generateShortNickname() {
    const uuid = uuidv4();
    const base64Uuid = Buffer.from(uuid).toString('base64'); // UUID를 Base64로 변환
    return base64Uuid.slice(0, 8); // 길이를 적당히 조정
}
