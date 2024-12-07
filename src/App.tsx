import { useState } from 'react';
import './App.css';  // Component-specific styles for App
import contacts from './data/contacts.json';
import { Contact } from './types/contact';
import ThemeToggle from './components/ToggleTheme';

const App: React.FC = () => {
  const [contactList] = useState<Contact[]>(contacts); // Original contact list (unchanged)
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search query

  // Filter contacts based on the search query
  const filteredContacts = contactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App container my-4">
      <h1 className="text-center mb-4">Contacts</h1>
      <ThemeToggle />
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
        />
      </div>

      {/* Contact Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="col mb-4 fade-in">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text"><strong>Email:</strong> {contact.email}</p>
                <p className="card-text"><strong>Phone:</strong> {contact.phone}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Show a message if no contacts are found */}
        {filteredContacts.length === 0 && (
          <p className="text-center text-muted">No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
