import { useState, useEffect } from "react"; // Removed useRef and useReactToPrint imports
import DataTable from "react-data-table-component";
import {
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Delete, Edit, AddCircle, Discount } from "@mui/icons-material";
import html2canvas from "html2canvas"; // For capturing image
import "../CustomerPage.css";

// Simulated data for the customers
const sampleData = [
  {
    id: 1,
    customername: "John Doe",
    mobileno: "1234567890",
    dob: "1995-01-01",
    gender: "Male",
    address: "123 Main St",
  },
  {
    id: 2,
    customername: "Jane Smith",
    mobileno: "1234567891",
    dob: "1994-05-12",
    gender: "Female",
    address: "456 Oak St",
  },
  {
    id: 3,
    customername: "Michael Johnson",
    mobileno: "1234567892",
    dob: "1992-09-24",
    gender: "Male",
    address: "789 Pine St",
  },
  // Add more data here...
];

const CustomerPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setData(sampleData); // Replace with actual API call
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (id) => {
    console.log(`Editing row with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting row with ID: ${id}`);
  };

  const handleAddRow = () => {
    console.log("Adding new row");
  };

  const handleDetails = (id) => {
    const customer = data.find((customer) => customer.id === id);
    setSelectedCustomer(customer);
    setShowCard(true); // Show the card when Discount is clicked
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setSelectedCustomer(null);
  };

  // Function to download the card as an image
  const handleDownloadCard = () => {
    const cardElement = document.getElementById("digitalCard");

    // Ensure only the design area is captured, excluding the button
    const clonedCard = cardElement.cloneNode(true);
    const downloadButton = clonedCard.querySelector("button");
    if (downloadButton) downloadButton.remove(); // Remove download button from the image capture

    html2canvas(clonedCard).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png"); // Generate image as PNG
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `customer-${selectedCustomer.id}-ecard.png`; // File name
      link.click();
    });
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "70px" },
    {
      name: "Customer Name",
      selector: (row) => row.customername,
      sortable: true,
      wrap: true,
    },
    { name: "Mobile Number", selector: (row) => row.mobileno, sortable: true },
    { name: "Date of Birth", selector: (row) => row.dob, sortable: true },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      width: "100px",
    },
    { name: "Address", selector: (row) => row.address, wrap: true },

    // New Discount column with an icon
    {
      name: "Discount",
      cell: (row) => (
        <Tooltip title="View Discount">
          <IconButton color="primary" onClick={() => handleDetails(row.id)}>
            <Discount />
          </IconButton>
        </Tooltip>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    // Action buttons (Edit, Delete)
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleEdit(row.id)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              sx={{ color: "red" }}
              onClick={() => handleDelete(row.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        minHeight: "300px",
        maxHeight: "500px",
        overflowY: "auto",
      },
    },
    responsiveWrapper: {
      style: {
        overflowY: "auto",
      },
    },
  };

  return (
    <div style={{ padding: "0px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "0px" }}>
        Customer Details
      </h1>
      <Tooltip title="Add New Row">
        <IconButton
          color="success"
          style={{ marginBottom: "10px" }}
          onClick={handleAddRow}
        >
          <AddCircle fontSize="large" />
        </IconButton>
      </Tooltip>

      {/* DataTable */}
      <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
        <DataTable
          title="Customer Details"
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          responsive
          defaultSortFieldId={1}
          customStyles={customStyles}
        />
      </div>

      {/* Discount Card Display with Overlay */}
      {showCard && selectedCustomer && (
        <>
          {/* Overlay */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
              zIndex: 1000,
            }}
            onClick={handleCloseCard}
          ></div>

          {/* Discount Card */}
          <Card
            id="digitalCard" // Set the ID for the card element
            style={{
              width: "350px",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(135deg, #6e7dff, #8b63f1)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
              color: "#fff",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "22px",
                  marginBottom: "15px",
                }}
              >
                Customer Digital Card
              </Typography>
              <Typography style={{ fontSize: "16px" }}>
                <strong>Name:</strong> {selectedCustomer.customername}
              </Typography>
              <Typography style={{ fontSize: "16px" }}>
                <strong>Mobile:</strong> {selectedCustomer.mobileno}
              </Typography>
              <Typography style={{ fontSize: "16px" }}>
                <strong>Gender:</strong> {selectedCustomer.gender}
              </Typography>
              <Typography style={{ fontSize: "16px" }}>
                <strong>Discount Available:</strong> 20% OFF
              </Typography>

              {/* Download Button */}
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{
                  marginTop: "20px",
                  backgroundColor: "#ff4081",
                  color: "#fff",
                  borderRadius: "25px",
                  fontWeight: "bold",
                }}
                onClick={handleDownloadCard} // Trigger the download
              >
                Download eCard
              </Button>

              {/* Close Button */}
              <Button
                variant="outlined"
                fullWidth
                style={{
                  marginTop: "10px",
                  color: "#ff6f61",
                  borderRadius: "25px",
                  fontWeight: "bold",
                }}
                onClick={handleCloseCard}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CustomerPage;
