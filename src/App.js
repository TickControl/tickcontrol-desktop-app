import React from 'react';
import './App.css';

function App() {
    // Mock data for now (we'll connect to the backend later)
    const customer = {
        name: "Joe Smith",
        status: "INACTIVE",
        address: "1234 East Main Street, Greenwich, CT 06830",
        sprayHistory: "This address was sprayed 4 times this year and has 0 open invoices",
        balance: 127.72,
        phone: "(203) 555-5555",
        email: "joesmith@gmail.com",
        paymentMethod: "MONTHLY CREDIT CARD 1-15 DOG",
        ratings: {
            friendliness: 4.35,
            easeOfWork: 4.75,
            timelinessOfPayment: 2,
            likelihoodToStay: 4,
            trustworthiness: 5
        },
        additionalInfo: {
            freeResprays: true,
            hasPets: true,
            hasWater: true,
            leftReview: true
        },
        internalNotes: [
            { date: "04/09/2024", operator: "Jacob", content: "Said they want it next week instead." },
            { date: "04/09/2024", operator: "Hunter", content: "Dog was outside, we’ll try to return later." },
            { date: "04/09/2024", operator: "Jeff", content: "Inquire about payment on invoice 12345. They said they will send a check ASAP." }
        ],
        paymentHistory: [
            { date: "10/20/2024", sprayNumber: "12345", amount: 103.36, paymentMethod: "NA", paymentDate: "NOT YET", amountDue: 127.72, currentAge: 7 },
            { date: "9/20/2024", sprayNumber: "12346", amount: 103.36, paymentMethod: "CHECK #000000", paymentDate: "10/20/2024", amountDue: 0, currentAge: 0 }
        ],
        creditCard: {
            date: "04/09/2024",
            nameOnCard: "JOE SMITH",
            cardNumber: "**** **** **** 1234",
            expiry: "10/25",
            cvv: "477",
            zip: "06811",
            useDebit: true
        },
        operatorInstructions: [
            "04/09/2024: Spray under the front porch.",
            "04/09/2024: Spray full perimeter and especially under the big pine trees on the property line.",
            "04/09/2024: This is a busy road with a shared driveway. Be mindful of pedestrians and watch out for neighbors entering the area."
        ],
        sprayLog: [
            {
                date: "10/09/2024",
                time: "10:30",
                operator: "JEFF",
                type: "FULL",
                test: "HUNTER",
                pesticide: "PERMANONE",
                epa: "EPA 432-183",
                precautionary: "CAUTION",
                concentration: 0.05,
                gallons: 133.6,
                milliliters: 122.2,
                squareFeet: 145000
            }
        ],
        startDate: "09/24/2024"
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <div style={{ backgroundColor: '#2E7D32', color: 'white', padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Sales</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Accounting</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Schedule</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Customers</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Operators</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Pesticides</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Messaging</button>
                        <button style={{ color: 'white', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>Trucks</button>
                        <button style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>Reporting</button>
                    </div>
                    <div>
                        <input type="text" placeholder="Search..." style={{ padding: '5px' }} />
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div style={{ backgroundColor: '#FBC02D', padding: '10px', textAlign: 'center' }}>
                <span style={{ marginRight: '20px' }}>SPRAY DAY 10</span>
                <span style={{ marginRight: '20px' }}>2 WORKDAYS LEFT IN MARCH</span>
                <span>116 JOBS LEFT TO COMPLETE</span>
            </div>

            {/* Customer Info */}
            <div style={{ marginTop: '20px' }}>
                <h1>{customer.name} - {customer.status}</h1>
                <p>
                    <a href={`https://maps.google.com/?q=${customer.address}`} target="_blank" rel="noopener noreferrer">
                        {customer.address}
                    </a>
                </p>
                <p>{customer.sprayHistory}</p>
                <p>The total balance is ${customer.balance.toFixed(2)}</p>
                <p>Phone: {customer.phone}</p>
                <p>Email: {customer.email}</p>
                <p>Payment Method: {customer.paymentMethod}</p>
                <button style={{ marginRight: '10px' }}>GOOGLE</button>
                <button style={{ marginRight: '10px' }}>{customer.status}</button>
                <button>SUBMIT CHANGES</button>
            </div>

            {/* Customer Rating */}
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>Customer Rating</h2>
                <p>Friendliness: {customer.ratings.friendliness} stars</p>
                <p>Ease of Work: {customer.ratings.easeOfWork}</p>
                <p>Timeliness of Payment: {customer.ratings.timelinessOfPayment}</p>
                <p>Likelihood to Stay: {customer.ratings.likelihoodToStay}</p>
                <p>Trustworthiness: {customer.ratings.trustworthiness}</p>
                <button>UPDATE</button>
            </div>

            {/* Additional Info */}
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>Additional Info About This Customer</h2>
                <label>
                    <input type="checkbox" checked={customer.additionalInfo.freeResprays} readOnly />
                    The customer has free re-sprays
                </label><br />
                <label>
                    <input type="checkbox" checked={customer.additionalInfo.hasPets} readOnly />
                    The customer has pets (dogs)
                </label><br />
                <label>
                    <input type="checkbox" checked={customer.additionalInfo.hasWater} readOnly />
                    The customer has water on the property
                </label><br />
                <label>
                    <input type="checkbox" checked={customer.additionalInfo.leftReview} readOnly />
                    The customer has left a positive review
                </label><br />
                <button>UPDATE</button>
            </div>

            {/* Internal Notes */}
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>Internal Notes</h2>
                {customer.internalNotes.map((note, index) => (
                    <p key={index} style={{ backgroundColor: note.content.includes("inquire") ? '#FFCDD2' : 'transparent' }}>
                        {note.date} {note.operator}: {note.content}
                    </p>
                ))}
                <input type="text" placeholder="Add a note..." style={{ width: '300px', marginRight: '10px' }} />
                <button>ADD</button>
            </div>

            {/* Payment History */}
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>Payment History - Current Age and Balance is ${customer.balance.toFixed(2)}</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '5px' }}>Date</th>
                            <th style={{ border: '1px solid #ccc', padding: '5px' }}>Spray #</th>
                            <th style={{ border: '1px solid #ccc', padding: '5px' }}>Amount</th>
                            <th style={{ border: '1px solid #ccc', padding: '5px' }}>Payment Method</th>
                            <th style={{ border: '1px solid #ccc', padding: '5px' }}>Payment Date</th>
                            <th style={{ border: '1px solid #ccc', padding: '5px' }}>Amount Due</th>
                            <th style={{ border: '1px solid #ccc', padding: '5px' }}>Current Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.paymentHistory.map((payment, index) => (
                            <tr key={index} style={{ backgroundColor: payment.amountDue > 0 ? '#FFCDD2' : 'transparent' }}>
                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{payment.date}</td>
                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{payment.sprayNumber}</td>
                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>${payment.amount.toFixed(2)}</td>
                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{payment.paymentMethod}</td>
                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{payment.paymentDate}</td>
                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>${payment.amountDue.toFixed(2)}</td>
                                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{payment.currentAge}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
