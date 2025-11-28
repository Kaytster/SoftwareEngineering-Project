import bcrypt from 'bcrypt';

const samplePasswords = [
    { id: 'US001', password: 'JohnPass123' },
    { id: 'US002', password: 'AmyAdmin123' },
    { id: 'US003', password: 'MarkPass123' },
    { id: 'US004', password: 'SarahPass123' },
    { id: 'US005', password: 'KatePass123' },
    { id: 'US006', password: 'TomPass123' },
    { id: 'US007', password: 'LucyPass123' },
    { id: 'US008', password: 'DanielPass123' },
    { id: 'US009', password: 'EllaPass123' },
    { id: 'US010', password: 'JoshAdmin123' },
];

const saltRounds = 10;

async function generateHashes() {
    const hashedUsers = [];
    for (const user of samplePasswords) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        hashedUsers.push({ ...user, hash: hashedPassword });

        console.log(`('${user.id}', '${user.password}', '${hashedPassword}'),`); //check
    }
    
    
    
}

generateHashes();