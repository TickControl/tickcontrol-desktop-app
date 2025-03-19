import React, { useState } from 'react';
import './App.css';

function App() {
    // Mock data for now (we'll connect to the backend later)
    const [customer, setCustomer] = useState({
        firstName: "Joe",
        lastName: "Smith",
        status: "INACTIVE",
        streetAddress: "1234 East Main Street",
        town: "Greenwich",
        zip: "06830",
        phone: "(203) 555-5555",
        email: "joesmith@gmail.com",
        couponCode: "",
        acreage: "1 – 1.5 Acres",
        pets: "Dog",
        advertising: "A friend referred me",
        comments: "",
        sprayHistory: "This address was sprayed 4 times this year and has 0 open invoices",
        balance: 127.72,
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
            leftReview: true,
            requiresNotice: false,
            hasPool: false
        },
        internalNotes: [
            { date: "04/09/2024", time: "8:30", operator: "Jacob", collection: false, content: "Said they want it next week instead." },
            { date: "04/09/2024", time: "10:35", operator: "Hunter", collection: false, content: "Dog was outside, we’ll try to return later." },
            { date: "04/09/2024", time: "4:57", operator: "Jeff", collection: true, content: "Inquire about payment on invoice 12345. They said they will send a check ASAP." }
        ],
        paymentHistory: [
            { date: "10/20/2024", invoiceNumber: "12345", amount: 103.36, paymentMethod: "NA", paymentDate: "NOT YET", balance: 127.72, age: 7 },
            { date: "9/20/2024", invoiceNumber: "12346", amount: 103.36, paymentMethod: "CHECK #1000000", paymentDate: "10/20/2024", balance: 0, age: 0 }
        ],
        creditCards: [
            { use: true, date: "04/09/2024", nameOnCard: "JOE SMITH", cardNumber: "**** **** **** 1234", expiry: "10/25", cvv: "477", zip: "06811" }
        ],
        operatorInstructions: [
            { date: "04/09/2024", content: "Spray under the front porch." },
            { date: "04/09/2024", content: "Spray full perimeter and especially under the big pine trees on the back property line." },
            { date: "04/09/2024", content: "This is a busy road with a shared driveway. Be mindful of pedestrians on foot and neighbors entering the area." }
        ],
        sprayLog: [
            {
                year: 2024,
                date: "10/09/2024",
                time: "10:30",
                operator: "HUNTER FLANAGAN PMCO 0058825",
                supervisor: "DARREN BONAVENTURA S-6583",
                type: "PERIMETER",
                pest: "TICKS",
                pesticide: "TEMPO SC ULTRA 240 ML",
                epa: "EPA 432-1363",
                precautionary: "CAUTION",
                concentration: 0.075,
                gallons: 133.6,
                milliliters: 122.2,
                squareFeet: 145000
            }
        ],
        startDate: "03/14/2024"
    });

    const [editing, setEditing] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState({ ...customer });
    const [newNote, setNewNote] = useState('');
    const [newInstruction, setNewInstruction] = useState('');
    const [newCreditCard, setNewCreditCard] = useState({
        use: false,
        date: "",
        nameOnCard: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        zip: ""
    });

    const handleEditToggle = () => {
        if (editing) {
            setCustomer(editedCustomer);
        }
        setEditing(!editing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdditionalInfoChange = (e) => {
        const { name, checked } = e.target;
        setEditedCustomer(prev => ({
            ...prev,
            additionalInfo: {
                ...prev.additionalInfo,
                [name]: checked
            }
        }));
    };

    const handleRatingChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value);
        if (numValue >= 0 && numValue <= 5) {
            setEditedCustomer(prev => ({
                ...prev,
                ratings: {
                    ...prev.ratings,
                    [name]: numValue
                }
            }));
        }
    };

    const handleCreditCardExpiryChange = (value) => {
        // Remove non-numeric characters except for the slash
        let cleanedValue = value.replace(/[^0-9/]/g, '');
        // Ensure the format is XX/XX
        if (cleanedValue.length > 2 && cleanedValue[2] !== '/') {
            cleanedValue = cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
        }
        if (cleanedValue.length > 5) {
            cleanedValue = cleanedValue.slice(0, 5);
        }
        setNewCreditCard(prev => ({ ...prev, expiry: cleanedValue }));
    };

    const handleAddNote = () => {
        if (newNote.trim()) {
            const today = new Date();
            const date = today.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const time = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            setCustomer(prev => ({
                ...prev,
                internalNotes: [
                    ...prev.internalNotes,
                    { date, time, operator: "Current User", collection: newNote.toLowerCase().includes("inquire"), content: newNote }
                ]
            }));
            setNewNote('');
        }
    };

    const handleAddInstruction = () => {
        if (newInstruction.trim()) {
            const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            setCustomer(prev => ({
                ...prev,
                operatorInstructions: [
                    ...prev.operatorInstructions,
                    { date: today, content: newInstruction }
                ]
            }));
            setNewInstruction('');
        }
    };

    const handleAddCreditCard = () => {
        if (newCreditCard.nameOnCard && newCreditCard.cardNumber) {
            const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
            setCustomer(prev => ({
                ...prev,
                creditCards: [
                    ...prev.creditCards,
                    { ...newCreditCard, date: today }
                ]
            }));
            setNewCreditCard({
                use: false,
                date: "",
                nameOnCard: "",
                cardNumber: "",
                expiry: "",
                cvv: "",
                zip: ""
            });
        }
    };

    const handleDeleteCreditCard = (index) => {
        setCustomer(prev => ({
            ...prev,
            creditCards: prev.creditCards.filter((_, i) => i !== index)
        }));
    };

    const handleDeleteInstruction = (index) => {
        setCustomer(prev => ({
            ...prev,
            operatorInstructions: prev.operatorInstructions.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="container">
            {/* Header */}
            <div className="header">
                <div className="nav-links">
                    <button>Home</button>
                    <button>Sales</button>
                    <button>Accounting</button>
                    <button>Schedule</button>
                    <button>Customers</button>
                    <button>Operators</button>
                    <button>Pesticides</button>
                    <button>Messaging</button>
                    <button>Trucks</button>
                    <button>Reporting</button>
                </div>
                <div className="header-title">TICK CONTROL, LLC | CUSTOMER PROFILE</div>
                <div>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            {/* Status Bar */}
            <div className={`status-bar ${customer.status === "ACTIVE" ? "active" : ""}`}>
                <img src="logo.png" alt="Tick Control Logo" />
                <span>SPRAY DAY 10</span>
                <span>2 WORKDAYS LEFT IN MARCH</span>
                <span>118 JOBS LEFT TO COMPLETE</span>
            </div>

            {/* Customer Info */}
            <div className="customer-info">
                <div className="customer-info-left">
                    <button className="return-button">RETURN TO CUSTOMERS</button>
                    <img src="house.jpg" alt="House" />
                    <button className="change-image-button">CHANGE IMAGE</button>
                </div>
                <div className="customer-info-center">
                    {editing ? (
                        <>
                            <div>
                                <input
                                    type="text"
                                    name="couponCode"
                                    value={editedCustomer.couponCode}
                                    onChange={handleInputChange}
                                    placeholder="Coupon Code"
                                />
                            </div>
                            <div>
                                <select
                                    name="acreage"
                                    value={editedCustomer.acreage}
                                    onChange={handleInputChange}
                                >
                                    <option value="Under .5 Acre">Under .5 Acre</option>
                                    <option value=".5 – 1 Acre">.5 – 1 Acre</option>
                                    <option value="1 – 1.5 Acres">1 – 1.5 Acres</option>
                                    <option value="1.5 – 2 Acres">1.5 – 2 Acres</option>
                                    <option value="2 – 2.5 Acres">2 – 2.5 Acres</option>
                                    <option value="Over 3 Acres">Over 3 Acres</option>
                                </select>
                            </div>
                            <div></div>
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedCustomer.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="email"
                                    value={editedCustomer.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div></div>
                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedCustomer.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedCustomer.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                />
                            </div>
                            <div></div>
                            <div>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={editedCustomer.streetAddress}
                                    onChange={handleInputChange}
                                    placeholder="Street Address"
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '10px' }}>Pets:</label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="pets"
                                            value="No Pets"
                                            checked={editedCustomer.pets === "No Pets"}
                                            onChange={handleInputChange}
                                        />
                                        No Pets
                                    </label>
                                    <label style={{ marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            name="pets"
                                            value="Dog"
                                            checked={editedCustomer.pets === "Dog"}
                                            onChange={handleInputChange}
                                        />
                                        Dog
                                    </label>
                                    <label style={{ marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            name="pets"
                                            value="Cat"
                                            checked={editedCustomer.pets === "Cat"}
                                            onChange={handleInputChange}
                                        />
                                        Cat
                                    </label>
                                    <label style={{ marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            name="pets"
                                            value="Dog & Cat"
                                            checked={editedCustomer.pets === "Dog & Cat"}
                                            onChange={handleInputChange}
                                        />
                                        Dog & Cat
                                    </label>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="town"
                                    value={editedCustomer.town}
                                    onChange={handleInputChange}
                                    placeholder="City/Town"
                                />
                            </div>
                            <div>
                                <select
                                    name="advertising"
                                    value={editedCustomer.advertising}
                                    onChange={handleInputChange}
                                >
                                    <option value="Facebook">Facebook</option>
                                    <option value="Direct Mail">Direct Mail</option>
                                    <option value="Television">Television</option>
                                    <option value="Lawn Sign">Lawn Sign</option>
                                    <option value="Google Search">Google Search</option>
                                    <option value="Internet Ads">Internet Ads</option>
                                    <option value="Saw our truck">Saw our truck</option>
                                    <option value="A friend referred me">A friend referred me</option>
                                    <option value="Trade Show">Trade Show</option>
                                </select>
                            </div>
                            <div></div>
                            <div>
                                <input
                                    type="text"
                                    name="zip"
                                    value={editedCustomer.zip}
                                    onChange={handleInputChange}
                                    placeholder="Zip"
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <textarea
                                    name="comments"
                                    value={editedCustomer.comments}
                                    onChange={handleInputChange}
                                    placeholder="Questions/Comments/Special Requests"
                                    style={{ width: '100%', height: '60px', resize: 'none' }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>{customer.couponCode || "N/A"}</div>
                            <div>{customer.acreage}</div>
                            <div></div>
                            <div>{customer.firstName}</div>
                            <div>{customer.email}</div>
                            <div></div>
                            <div>{customer.lastName}</div>
                            <div>{customer.phone}</div>
                            <div></div>
                            <div>{customer.streetAddress}</div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '10px' }}>Pets: {customer.pets}</label>
                                </div>
                            </div>
                            <div>{customer.town}</div>
                            <div>{customer.advertising}</div>
                            <div></div>
                            <div>{customer.zip}</div>
                            <div style={{ gridColumn: 'span 2' }}>{customer.comments || "N/A"}</div>
                        </>
                    )}
                </div>
                <div className="customer-info-right">
                    <img src="map.jpg" alt="Google Map" />
                </div>
            </div>
            <div className="customer-info-buttons">
                <p>{customer.sprayHistory}. The total balance is ${customer.balance.toFixed(2)}</p>
                <button className="google">GOOGLE</button>
                <button className={`status-${customer.status.toLowerCase()}`}>{customer.status}</button>
                <button className="submit" onClick={handleEditToggle}>
                    {editing ? "SUBMIT CHANGES" : "EDIT"}
                </button>
            </div>

            {/* Customer Rating and Additional Info */}
            <div className="customer-rating-info">
                <div className="customer-rating">
                    <div className="section">
                        <h2>Customer Rating - {customer.ratings.friendliness} Stars</h2>
                        {editing ? (
                            <>
                                <div className="rating-item">
                                    <label>Friendliness: </label>
                                    <input
                                        type="number"
                                        name="friendliness"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={editedCustomer.ratings.friendliness}
                                        onChange={handleRatingChange}
                                    />
                                </div>
                                <div className="rating-item">
                                    <label>Ease of Work: </label>
                                    <input
                                        type="number"
                                        name="easeOfWork"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={editedCustomer.ratings.easeOfWork}
                                        onChange={handleRatingChange}
                                    />
                                </div>
                                <div className="rating-item">
                                    <label>Timeliness of Payment: </label>
                                    <input
                                        type="number"
                                        name="timelinessOfPayment"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={editedCustomer.ratings.timelinessOfPayment}
                                        onChange={handleRatingChange}
                                    />
                                </div>
                                <div className="rating-item">
                                    <label>Likelihood to Stay: </label>
                                    <input
                                        type="number"
                                        name="likelihoodToStay"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={editedCustomer.ratings.likelihoodToStay}
                                        onChange={handleRatingChange}
                                    />
                                </div>
                                <div className="rating-item">
                                    <label>Trustworthiness: </label>
                                    <input
                                        type="number"
                                        name="trustworthiness"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={editedCustomer.ratings.trustworthiness}
                                        onChange={handleRatingChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Friendliness: {customer.ratings.friendliness}</p>
                                <p>Ease of Work: {customer.ratings.easeOfWork}</p>
                                <p>Timeliness of Payment: {customer.ratings.timelinessOfPayment}</p>
                                <p>Likelihood to Stay: {customer.ratings.likelihoodToStay}</p>
                                <p>Trustworthiness: {customer.ratings.trustworthiness}</p>
                            </>
                        )}
                        <button className="update">UPDATE</button>
                    </div>
                </div>
                <div className="additional-info-section">
                    <div className="section">
                        <h2>Additional Info About This Customer</h2>
                        <div className="additional-info">
                            <label>
                                <input
                                    type="checkbox"
                                    name="requiresNotice"
                                    checked={editing ? editedCustomer.additionalInfo.requiresNotice : customer.additionalInfo.requiresNotice}
                                    onChange={handleAdditionalInfoChange}
                                    disabled={!editing}
                                />
                                This customer requires notice before we come.
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="hasPets"
                                    checked={editing ? editedCustomer.additionalInfo.hasPets : customer.additionalInfo.hasPets}
                                    onChange={handleAdditionalInfoChange}
                                    disabled={!editing}
                                />
                                This customer has a dangerous dog(s).
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="hasPool"
                                    checked={editing ? editedCustomer.additionalInfo.hasPool : customer.additionalInfo.hasPool}
                                    onChange={handleAdditionalInfoChange}
                                    disabled={!editing}
                                />
                                This customer has a pool.
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="hasWater"
                                    checked={editing ? editedCustomer.additionalInfo.hasWater : customer.additionalInfo.hasWater}
                                    onChange={handleAdditionalInfoChange}
                                    disabled={!editing}
                                />
                                This customer has water on the property.
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="leftReview"
                                    checked={editing ? editedCustomer.additionalInfo.leftReview : customer.additionalInfo.leftReview}
                                    onChange={handleAdditionalInfoChange}
                                    disabled={!editing}
                                />
                                This customer has left a positive review.
                            </label>
                        </div>
                        <button className="update">UPDATE</button>
                    </div>
                </div>
            </div>

            {/* Sidebar: Scheduled Start Date and Contract */}
            <div className="main-content">
                <div className="content-sections">
                    {/* Internal Notes */}
                    <div className="section">
                        <h2>Internal Notes</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date Added</th>
                                    <th>Time</th>
                                    <th>Author</th>
                                    <th>Collection</th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer.internalNotes.map((note, index) => (
                                    <tr key={index} className={note.collection ? "unpaid" : ""}>
                                        <td>{note.date}</td>
                                        <td>{note.time}</td>
                                        <td>{note.operator}</td>
                                        <td>
                                            <input type="checkbox" checked={note.collection} readOnly />
                                        </td>
                                        <td>{note.content}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ marginTop: '10px' }}>
                            <input
                                type="text"
                                placeholder="Add a note..."
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                            />
                            <button className="add" onClick={handleAddNote}>+</button>
                        </div>
                    </div>

                    {/* Payment History */}
                    <div className="section">
                        <h2>Payment History - 2 of 3 Invoices are Unpaid, Current Balance ${customer.balance.toFixed(2)}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Spray Date</th>
                                    <th>Invoice #</th>
                                    <th>Amount</th>
                                    <th>Payment Type</th>
                                    <th>Payment Date</th>
                                    <th>Balance</th>
                                    <th>Age</th>
                                    <th>Internal Notes</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer.paymentHistory.map((payment, index) => (
                                    <tr key={index} className={payment.balance > 0 ? "unpaid" : "paid"}>
                                        <td>{payment.date}</td>
                                        <td>{payment.invoiceNumber}</td>
                                        <td>${payment.amount.toFixed(2)}</td>
                                        <td>{payment.paymentMethod}</td>
                                        <td>{payment.paymentDate}</td>
                                        <td>${payment.balance.toFixed(2)}</td>
                                        <td>{payment.age}</td>
                                        <td>Internal Notes</td>
                                        <td>{payment.balance > 0 ? "UNPAID" : "PAID"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Credit Card */}
                    <div className="section">
                        <h2>Customer Credit Card</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Use</th>
                                    <th>Date Added</th>
                                    <th>Name on Card</th>
                                    <th>Credit Card Number</th>
                                    <th>Expiration</th>
                                    <th>CVV Code</th>
                                    <th>Zip Code</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer.creditCards.map((card, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="checkbox" checked={card.use} readOnly />
                                        </td>
                                        <td>{card.date}</td>
                                        <td>{card.nameOnCard}</td>
                                        <td>{card.cardNumber}</td>
                                        <td>{card.expiry}</td>
                                        <td>{card.cvv}</td>
                                        <td>{card.zip}</td>
                                        <td>
                                            <button className="del" onClick={() => handleDeleteCreditCard(index)}>DEL</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={newCreditCard.use}
                                            onChange={(e) => setNewCreditCard({ ...newCreditCard, use: e.target.checked })}
                                        />
                                    </td>
                                    <td>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCreditCard.nameOnCard}
                                            onChange={(e) => setNewCreditCard({ ...newCreditCard, nameOnCard: e.target.value })}
                                            placeholder="Name on Card"
                                            style={{ width: '100px' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCreditCard.cardNumber}
                                            onChange={(e) => setNewCreditCard({ ...newCreditCard, cardNumber: e.target.value })}
                                            placeholder="Card Number"
                                            style={{ width: '100px' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCreditCard.expiry}
                                            onChange={(e) => handleCreditCardExpiryChange(e.target.value)}
                                            placeholder="MM/YY"
                                            style={{ width: '50px' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCreditCard.cvv}
                                            onChange={(e) => setNewCreditCard({ ...newCreditCard, cvv: e.target.value })}
                                            placeholder="CVV"
                                            style={{ width: '50px' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCreditCard.zip}
                                            onChange={(e) => setNewCreditCard({ ...newCreditCard, zip: e.target.value })}
                                            placeholder="Zip"
                                            style={{ width: '50px' }}
                                        />
                                    </td>
                                    <td>
                                        <button className="add" onClick={handleAddCreditCard}>+</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Operator Instructions */}
                    <div className="section">
                        <h2>Operator Instructions for This Address</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date Added</th>
                                    <th>Instruction</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer.operatorInstructions.map((instruction, index) => (
                                    <tr key={index}>
                                        <td>{instruction.date}</td>
                                        <td>{instruction.content}</td>
                                        <td>
                                            <button className="del" onClick={() => handleDeleteInstruction(index)}>DEL</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Add an instruction..."
                                            value={newInstruction}
                                            onChange={(e) => setNewInstruction(e.target.value)}
                                            style={{ width: '100%' }}
                                        />
                                    </td>
                                    <td>
                                        <button className="add" onClick={handleAddInstruction}>+</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Spray Log */}
                    <div className="section">
                        <h2>Spray Log - Supervisor Darren Bonaventura S-6583</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Operator(s)</th>
                                    <th>Type</th>
                                    <th>Pest</th>
                                    <th>Pesticide</th>
                                    <th>EPA</th>
                                    <th>Precautionary</th>
                                    <th>Conc</th>
                                    <th>Gal</th>
                                    <th>ML</th>
                                    <th>Sq Ft</th>
                                    <th>Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer.sprayLog.map((spray, index) => (
                                    <tr key={index}>
                                        <td>{spray.year}</td>
                                        <td>{spray.date}</td>
                                        <td>{spray.time}</td>
                                        <td>{spray.operator}</td>
                                        <td>{spray.type}</td>
                                        <td>{spray.pest}</td>
                                        <td>{spray.pesticide}</td>
                                        <td>{spray.epa}</td>
                                        <td>{spray.precautionary}</td>
                                        <td>{spray.concentration}%</td>
                                        <td>{spray.gallons}</td>
                                        <td>{spray.milliliters}</td>
                                        <td>{spray.squareFeet}</td>
                                        <td><button onClick={() => alert("Load more entries (placeholder)")}>MORE</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="sidebar">
                    <div className="section">
                        <h2>Scheduled Start Date</h2>
                        <p>{customer.startDate}</p>
                    </div>
                    <div className="section">
                        <h2>Contract</h2>
                        <button className="view-contract">VIEW CONTRACT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
