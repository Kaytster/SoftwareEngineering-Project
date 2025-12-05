import Database from "better-sqlite3";
const db = new Database("sustainwear.db");

db.pragma("journal_mode = WAL");


try {
    db.exec(
        `
        CREATE TABLE IF NOT EXISTS Charity (
            CharityID TEXT NOT NULL,
            CharityName TEXT NOT NULL,
            Description TEXT NOT NULL,
            Address TEXT NOT NULL,
            Email TEXT NOT NULL,
            PRIMARY KEY (CharityID)
        );

        CREATE TABLE IF NOT EXISTS Image(
            ImageID TEXT NOT NULL,
            ServerName TEXT NOT NULL,
            PRIMARY KEY (ImageID)
        );

        CREATE TABLE IF NOT EXISTS Category (
            CategoryID INTEGER NOT NULL,
            Description TEXT NOT NULL,
            PRIMARY KEY (CategoryID)
        );

        CREATE TABLE IF NOT EXISTS ClothingItem (
            ItemID TEXT NOT NULL,
            CategoryID INTEGER NOT NULL,
            Colour TEXT NOT NULL,
            Brand TEXT NOT NULL,
            ClothingSize TEXT NOT NULL,
            Description TEXT,
            PRIMARY KEY (ItemID),
            FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
        );

        CREATE TABLE IF NOT EXISTS User (
            UserID TEXT NOT NULL,
            Email TEXT NOT NULL UNIQUE,
            PasswordHash TEXT NOT NULL,
            FirstName TEXT NOT NULL,
            MiddleName TEXT,
            LastName TEXT NOT NULL,
            Address TEXT NOT NULL,
            AvatarImageID TEXT,
            Role TEXT NOT NULL,
            Status TEXT NOT NULL,
            CharityID TEXT,
            PRIMARY KEY (UserID),
            FOREIGN KEY (AvatarImageID) REFERENCES Image(ImageID),
            FOREIGN KEY (CharityID) REFERENCES Charity(CharityID)
        );

        CREATE TABLE IF NOT EXISTS Donation (
            DonationID TEXT NOT NULL,
            ItemID TEXT NOT NULL,
            ImageID TEXT NOT NULL,
            DonorID TEXT NOT NULL,
            CharityID TEXT NOT NULL,
            DateTime DATETIME NOT NULL,
            Status TEXT NOT NULL,
            PRIMARY KEY (DonationID),
            FOREIGN KEY (CharityID) REFERENCES Charity(CharityID),
            FOREIGN KEY (DonorID) REFERENCES User(UserID),
            FOREIGN KEY (ImageID) REFERENCES Image(ImageID),
            FOREIGN KEY (ItemID) REFERENCES ClothingItem(ItemID)
        );
    `);
    console.log("Tables created successfully!");
}
catch (error) {
    console.error("Error creating tables:", error);
}
export default db;