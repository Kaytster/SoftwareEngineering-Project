import Database from "better-sqlite3";
const db = new Database('sustainwear.db', {
    verbose:console.log
});

db.pragma('journal_mode = WAL');

const query = `
    CREATE TABLE Charity (
    CharityID TEXT NOT NULL,
    CharityName TEXT NOT NULL,
    Description TEXT NOT NULL,
    Address TEXT NOT NULL,
    Email TEXT NOT NULL,
    PRIMARY KEY (CharityID)
    );

    CREATE TABLE Image (
        ImageID TEXT NOT NULL,
        ServerName TEXT NOT NULL,
        PRIMARY KEY (ImageID)
    );

    CREATE TABLE Category (
        CategoryID INTEGER NOT NULL,
        Description TEXT NOT NULL,
        PRIMARY KEY (CategoryID)
    );

    CREATE TABLE ClothingItem (
        ItemID TEXT NOT NULL,
        CategoryID INTEGER NOT NULL,
        Colour TEXT NOT NULL,
        Brand TEXT NOT NULL,
        ClothingSize TEXT NOT NULL,
        Description TEXT,
        PRIMARY KEY (ItemID),
        FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID) ON UPDATE CASCADE ON DELETE CASCADE
    );

    CREATE TABLE User (
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
        FOREIGN KEY (AvatarImageID) REFERENCES Image(ImageID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (CharityID) REFERENCES Charity(CharityID) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE Donation (
        DonationID TEXT NOT NULL,
        ItemID TEXT NOT NULL,
        ImageID TEXT NOT NULL,
        DonorID TEXT NOT NULL,
        CharityID TEXT NOT NULL,
        DateTime DATETIME NOT NULL,
        Status TEXT NOT NULL,
        PRIMARY KEY (DonationID),
        FOREIGN KEY (CharityID) REFERENCES Charity(CharityID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (DonorID) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (ImageID) REFERENCES Image(ImageID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (ItemID) REFERENCES ClothingItem(ItemID) ON DELETE CASCADE ON UPDATE CASCADE
    );
`;

db.exec(query);