<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> d80e5e38bedc9279555795eaf7e77e54a4454e53
import bcrypt from 'bcryptjs';

const samplePasswords = [
    { id: 'US001', email: 'john@example.com', password: 'JohnPass123', firstName: 'John', middleName: null, lastName: 'Smith', address: '20 River Road, London', postcode: 'SW3 9AA', phone: '+44 20 7946 1001', imageId: 'IM001', role: 'Donor', status: 'Active', charityId: null },
    { id: 'US002', email: 'amy@example.com', password: 'AmyAdmin123', firstName: 'Amy', middleName: 'Louise', lastName: 'Brown', address: '55 Hill Street, Manchester', postcode: 'M2 5DC', phone: '+44 161 555 1002', imageId: 'IM002', role: 'Admin', status: 'Active', charityId: 'CH002' },
    { id: 'US003', email: 'mark@example.com', password: 'MarkPass123', firstName: 'Mark', middleName: null, lastName: 'Johnson', address: '14 Lake Drive, Bristol', postcode: 'BS2 8EE', phone: '+44 117 555 1003', imageId: 'IM003', role: 'Donor', status: 'Active', charityId: null },
    { id: 'US004', email: 'sarah@example.com', password: 'SarahPass123', firstName: 'Sarah', middleName: 'Anne', lastName: 'Lee', address: '77 Oak Road, Birmingham', postcode: 'B3 2HY', phone: '+44 121 444 1004', imageId: 'IM004', role: 'CharityWorker', status: 'Active', charityId: 'CH003' },
    { id: 'US005', email: 'kate@example.com', password: 'KatePass123', firstName: 'Kate', middleName: null, lastName: 'Evans', address: '10 Bridge Street, Leeds', postcode: 'LS2 7PT', phone: '+44 113 777 1005', imageId: 'IM005', role: 'Donor', status: 'Inactive', charityId: null },
    { id: 'US006', email: 'tom@example.com', password: 'TomPass123', firstName: 'Tom', middleName: 'James', lastName: 'Anderson', address: '9 Meadow Lane, Nottingham', postcode: 'NG2 6JL', phone: '+44 115 444 1006', imageId: 'IM006', role: 'Donor', status: 'Active', charityId: null },
    { id: 'US007', email: 'lucy@example.com', password: 'LucyPass123', firstName: 'Lucy', middleName: null, lastName: 'Wright', address: '4 Willow Road, Cardiff', postcode: 'CF11 6AP', phone: '+44 29 222 1007', imageId: 'IM007', role: 'Donor', status: 'Active', charityId: null },
    { id: 'US008', email: 'daniel@example.com', password: 'DanielPass123', firstName: 'Daniel', middleName: 'Thomas', lastName: 'Green', address: '81 Silver Street, Glasgow', postcode: 'G2 3AL', phone: '+44 141 888 1008', imageId: 'IM008', role: 'CharityWorker', status: 'Active', charityId: 'CH007' },
    { id: 'US009', email: 'ella@example.com', password: 'EllaPass123', firstName: 'Ella', middleName: 'Grace', lastName: 'Adams', address: '33 Longwood Avenue, Liverpool', postcode: 'L2 9QR', phone: '+44 151 666 1009', imageId: 'IM009', role: 'Donor', status: 'Active', charityId: null },
    { id: 'US010', email: 'josh@example.com', password: 'JoshAdmin123', firstName: 'Josh', middleName: null, lastName: 'Baker', address: '12 Queen Street, Newcastle', postcode: 'NE3 4EX', phone: '+44 191 333 1010', imageId: 'IM010', role: 'Admin', status: 'Active', charityId: 'CH009' },
<<<<<<< HEAD
>>>>>>> c9e116b1999f7273c3de053d00988ba3b4f2df52
=======
>>>>>>> d80e5e38bedc9279555795eaf7e77e54a4454e53
];

const saltRounds = 10;

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> d80e5e38bedc9279555795eaf7e77e54a4454e53
async function GenerateHashes() {
    const sqlValues = [];

    for (const user of samplePasswords) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            const middleNameSql = user.middleName ? `'${user.middleName}'` : 'NULL';
            const charityIdSql = user.charityId ? `'${user.charityId}'` : 'NULL';

            const sqlValue = `('${user.id}', '${user.email}', '${hashedPassword}', '${user.firstName}', ${middleNameSql}, '${user.lastName}', '${user.address}', '${user.postcode}', '${user.phone}', '${user.imageId}', '${user.role}', '${user.status}', ${charityIdSql})`;
            
            sqlValues.push(sqlValue);
        } catch (error) {
            console.error(`Error hashing password for user ${user.id}:`, error);
            return;
        }
    }

    const finalSql = `
INSERT INTO User (UserID, Email, PasswordHash, FirstName, MiddleName, LastName, Address, Postcode, PhoneNumber, AvatarImageID, Role, Status, CharityID) VALUES
${sqlValues.join(',\n')};
`;
    
    console.log(finalSql);
}

GenerateHashes();
<<<<<<< HEAD
>>>>>>> c9e116b1999f7273c3de053d00988ba3b4f2df52
=======
>>>>>>> d80e5e38bedc9279555795eaf7e77e54a4454e53
