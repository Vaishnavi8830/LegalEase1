const indianLaws = {
    "Constitutional Law": {
        description: "Laws regarding the Indian Constitution, fundamental rights, and duties.",
        laws: [
            "Constitution of India",
            "Fundamental Rights",
            "Directive Principles of State Policy",
            "Constitutional Amendments",
            "Right to Constitutional Remedies",
            "Judicial Review",
            "Representation of the People Act, 1950",
            "Representation of the People Act, 1951",
            "Contempt of Courts Act, 1971"
        ]
    },

    "Criminal Law": {
        description: "Laws related to crimes, punishments, and public safety.",
        laws: [
            "Indian Penal Code (IPC)",
            "Bharatiya Nyaya Sanhita, 2023",
            "Narcotic Drugs and Psychotropic Substances Act, 1985",
            "Prevention of Corruption Act, 1988",
            "Protection of Children from Sexual Offences Act, 2012",
            "Arms Act, 1959",
            "Unlawful Activities (Prevention) Act, 1967",
            "Prevention of Money Laundering Act, 2002"
        ]
    },

    "Civil Law": {
        description: "Laws governing contracts, property, and civil disputes.",
        laws: [
            "Indian Contract Act, 1872",
            "Sale of Goods Act, 1930",
            "Specific Relief Act, 1963",
            "Limitation Act, 1963",
            "Code of Civil Procedure, 1908",
            "Arbitration and Conciliation Act, 1996",
            "Indian Trusts Act, 1882"
        ]
    },

    "Property Law": {
        description: "Laws related to ownership, transfer, and property rights.",
        laws: [
            "Transfer of Property Act, 1882",
            "Indian Succession Act, 1925",
            "Registration Act, 1908",
            "Indian Easements Act, 1882",
            "Indian Stamp Act, 1899",
            "Real Estate (Regulation and Development) Act, 2016 (RERA)",
            "Prohibition of Benami Property Transactions Act, 1988",
            "Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013"
        ]
    },

    "Family Law": {
        description: "Laws related to marriage, divorce, child protection, and maintenance.",
        laws: [
            "Hindu Marriage Act, 1955",
            "Hindu Succession Act, 1956",
            "Hindu Adoption and Maintenance Act, 1956",
            "Hindu Minority and Guardianship Act, 1956",
            "Special Marriage Act, 1954",
            "Muslim Personal Law",
            "Christian Marriage Act, 1872",
            "Parsi Marriage and Divorce Act, 1936",
            "Guardians and Wards Act, 1890",
            "Prohibition of Child Marriage Act, 2006",
            "Protection of Women from Domestic Violence Act, 2005",
            "Maintenance and Welfare of Parents and Senior Citizens Act, 2007"
        ]
    },

    "Labor Law": {
        description: "Laws protecting workers, employment, and workplace safety.",
        laws: [
            "Industrial Disputes Act, 1947",
            "Factories Act, 1948",
            "Minimum Wages Act, 1948",
            "Payment of Wages Act, 1936",
            "Employees' State Insurance Act, 1948",
            "Employees' Provident Funds Act, 1952",
            "Maternity Benefit Act, 1961",
            "Payment of Bonus Act, 1965",
            "Contract Labour (Regulation and Abolition) Act, 1970",
            "Payment of Gratuity Act, 1972",
            "Trade Unions Act, 1926",
            "Code on Wages, 2019",
            "Industrial Relations Code, 2020",
            "Code on Social Security, 2020",
            "Occupational Safety, Health and Working Conditions Code, 2020"
        ]
    },

    "Environmental Law": {
        description: "Laws protecting the environment, pollution control, and wildlife.",
        laws: [
            "Environment Protection Act, 1986",
            "Water Pollution Control Act, 1974",
            "Air Pollution Control Act, 1981",
            "Wildlife Protection Act, 1972",
            "Forest Conservation Act, 1980",
            "Biological Diversity Act, 2002",
            "National Green Tribunal Act, 2010",
            "Public Liability Insurance Act, 1991",
            "Energy Conservation Act, 2001"
        ]
    },

    "Tax Law": {
        description: "Laws related to income tax, GST, and other taxes.",
        laws: [
            "Income Tax Act, 1961",
            "Central Goods and Services Tax (CGST) Act, 2017",
            "Integrated Goods and Services Tax (IGST) Act, 2017",
            "Union Territory Goods and Services Tax (UTGST) Act, 2017",
            "Customs Act, 1962",
            "Central Excise Act, 1944",
            "Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act, 2015"
        ]
    },

    "Intellectual Property Law": {
        description: "Laws protecting inventions, copyrights, trademarks, and designs.",
        laws: [
            "Patents Act, 1970",
            "Copyright Act, 1957",
            "Trademarks Act, 1999",
            "Designs Act, 2000",
            "Geographical Indications of Goods (Registration and Protection) Act, 1999",
            "Protection of Plant Varieties and Farmers' Rights Act, 2001",
            "Semiconductor Integrated Circuits Layout-Design Act, 2000"
        ]
    },

    "Commercial Law": {
        description: "Laws governing business, companies, and trade.",
        laws: [
            "Companies Act, 2013",
            "Negotiable Instruments Act, 1881",
            "Partnership Act, 1932",
            "Limited Liability Partnership Act, 2008",
            "Insolvency and Bankruptcy Code, 2016",
            "Competition Act, 2002",
            "Securities and Exchange Board of India Act, 1992",
            "Foreign Exchange Management Act, 1999"
        ]
    },

    "Information Technology Law": {
        description: "Laws governing digital, internet, and IT-related activities.",
        laws: [
            "Information Technology Act, 2000",
            "Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021",
            "Digital Personal Data Protection Act, 2023"
        ]
    },

    "Consumer Protection Law": {
        description: "Laws protecting consumers from unfair trade, defective goods, and services.",
        laws: [
            "Consumer Protection Act, 2019",
            "Legal Metrology Act, 2009",
            "Food Safety and Standards Act, 2006"
        ]
    },

    "RTO / Traffic Law": {
        description: "Laws for driving, vehicles, road safety, and licenses.",
        laws: [
            "Motor Vehicles Act, 1988",
            "Road Transport Authority Rules",
            "Traffic Violations and Fines",
            "Vehicle Registration Rules",
            "Driving License Regulations"
        ]
    },

    "Women Safety Law": {
        description: "Laws ensuring protection and rights of women.",
        laws: [
            "Protection of Women from Domestic Violence Act, 2005",
            "Dowry Prohibition Act, 1961",
            "Sexual Harassment of Women at Workplace Act, 2013",
            "Prohibition of Child Marriage Act, 2006",
            "Criminal Law (Amendment) Act, 2013"
        ]
    },

    "Human Rights Law": {
        description: "Laws protecting civil liberties and human rights.",
        laws: [
            "Protection of Human Rights Act, 1993",
            "National Human Rights Commission Act, 1993",
            "Protection of Civil Rights Act, 1955",
            "Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989",
            "Bonded Labour System (Abolition) Act, 1976"
        ]
    }
};

export default indianLaws;
