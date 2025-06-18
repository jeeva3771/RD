import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Briefcase,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    date: {
      date: "",
    },
    jobDetails: {
      jobOwner: "",
      jobQty: "",
      jobCompletionDate: "",
    },
    clientDetails: {
      clientName: "",
      contactPerson: "",
      phoneNumber: "",
      email: "",
      billingStreetAddress: "",
      billingStreetAddress2: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      deliveryStreetAddress: "",
      deliveryStreetAddress2: "",
      deliveryCity: "",
      deliveryState: "",
      deliveryPostalCode: "",
      deliveryType: "Single Point",
      courier: "RD Courier",
      productName: "",
      productSize: "",
    },
  });

  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [expandedSteps, setExpandedSteps] = useState(new Set());

  const formSteps = [
    {
      id: "date",
      title: "Date",
      icon: Calendar,
      fields: [{ name: "date", label: "Date", type: "date", required: true }],
    },
    {
      id: "jobDetails",
      title: "Job Details",
      icon: Briefcase,
      fields: [
        {
          name: "jobOwner",
          label: "Job Owner",
          type: "select",
          required: true,
          options: [
            "Please Select",
            "John Doe",
            "RD",
            "Mike Johnson",
            "David Chen",
          ],
        },
        { name: "jobQty", label: "Job QTY", type: "number", required: true },
        {
          name: "jobCompletionDate",
          label: "Job Completion Date",
          type: "date",
          required: true,
        },
      ],
    },
    {
      id: "clientDetails",
      title: "Client Details",
      icon: User,
      fields: [
        {
          name: "clientName",
          label: "Client Name",
          type: "text",
          required: true,
        },
        {
          name: "contactPerson",
          label: "Contact Person",
          type: "text",
          required: true,
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "tel",
          required: true,
          placeholder: "Enter phone number",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          placeholder: "example@example.com",
        },

        // Billing Address Section
        {
          name: "billingAddressHeader",
          label: "Billing Address",
          type: "header",
        },
        {
          name: "billingStreetAddress",
          label: "Street Address",
          type: "text",
          required: true,
        },
        {
          name: "billingStreetAddress2",
          label: "Street Address Line 2",
          type: "text",
          required: false,
        },
        {
          name: "billingCity",
          label: "City",
          type: "text",
          required: true,
          width: "half",
        },
        {
          name: "billingState",
          label: "State / Province",
          type: "text",
          required: true,
          width: "half",
        },
        {
          name: "billingPostalCode",
          label: "Postal / Zip Code",
          type: "text",
          required: true,
        },

        // Delivery Address Section
        {
          name: "deliveryAddressHeader",
          label: "Delivery Address",
          type: "header",
        },
        {
          name: "deliveryStreetAddress",
          label: "Street Address",
          type: "text",
          required: true,
        },
        {
          name: "deliveryStreetAddress2",
          label: "Street Address Line 2",
          type: "text",
          required: false,
        },
        {
          name: "deliveryCity",
          label: "City",
          type: "text",
          required: true,
          width: "half",
        },
        {
          name: "deliveryState",
          label: "State / Province",
          type: "text",
          required: true,
          width: "half",
        },
        {
          name: "deliveryPostalCode",
          label: "Postal / Zip Code",
          type: "text",
          required: true,
        },

        // Delivery Options
        { name: "deliveryTypeHeader", label: "Delivery Type", type: "header" },
        {
          name: "deliveryType",
          label: "Delivery Type",
          type: "radio",
          required: true,
          options: [
            { value: "Single Point", label: "Single Point" },
            { value: "Multi Point", label: "Multi Point" },
          ],
        },

        { name: "courierHeader", label: "Courier", type: "header" },
        {
          name: "courier",
          label: "Courier",
          type: "radio",
          required: true,
          options: [
            { value: "Client Courier", label: "Client Courier" },
            { value: "RD Courier", label: "RD Courier" },
          ],
        },

        // Product Information
        { name: "productHeader", label: "Product Information", type: "header" },
        {
          name: "productName",
          label: "Product Name",
          type: "text",
          required: true,
        },
        {
          name: "productSize",
          label: "Product Size",
          type: "text",
          required: true,
        },
      ],
    },
  ];

  const handleInputChange = (stepId, fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [fieldName]: value,
      },
    }));
  };

  const validateStep = (stepIndex) => {
    const step = formSteps[stepIndex];
    const stepData = formData[step.id];

    return step.fields.every((field) => {
      if (field.type === "header") return true;

      if (field.required) {
        const value = stepData[field.name];
        if (field.type === "select") {
          return value && value.trim() !== "" && value !== "Please Select";
        }
        return value && value.trim() !== "";
      }
      return true;
    });
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const toggleStepExpansion = (stepIndex) => {
    setExpandedSteps((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(stepIndex)) {
        newExpanded.delete(stepIndex);
      } else {
        newExpanded.add(stepIndex);
      }
      return newExpanded;
    });
  };

  const handleSubmit = () => {
    
      alert(
        "Form submitted successfully!"
      );  
    }
  

  const isCurrentStepValid = validateStep(currentStep);

  const renderField = (field, stepId) => {
    if (field.type === "header") {
      return (
        <div key={field.name} className="mb-4 mt-5 first:mt-0">
          <h3 className="h5 fw-semibold text-dark mb-3 pb-2 border-bottom">
            {field.label}
          </h3>
        </div>
      );
    }

    if (field.type === "radio") {
      return (
        <div key={field.name} className="mb-4">
          <label className="form-label fw-medium fs-6 mb-3">
            {field.label}
            {field.required && <span className="text-danger ms-1">*</span>}
          </label>
          <div className="d-flex gap-4">
            {field.options.map((option) => (
              <div key={option.value} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={field.name}
                  id={`${field.name}_${option.value.replace(/\s+/g, "_")}`}
                  value={option.value}
                  checked={formData[stepId][field.name] === option.value}
                  onChange={(e) =>
                    handleInputChange(stepId, field.name, e.target.value)
                  }
                  required={field.required}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${field.name}_${option.value.replace(/\s+/g, "_")}`}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const isHalfWidth = field.width === "half";
    const containerClass = isHalfWidth ? "col-md-6" : "col-12";

    return (
      <div key={field.name} className={`${containerClass} mb-4`}>
        <label htmlFor={field.name} className="form-label fw-medium fs-6">
          {field.label}
          {field.required && <span className="text-danger ms-1">*</span>}
        </label>
        {field.type === "select" ? (
          <select
            className="form-select form-select-lg"
            id={field.name}
            name={field.name}
            value={formData[stepId][field.name]}
            onChange={(e) =>
              handleInputChange(stepId, field.name, e.target.value)
            }
            required={field.required}
          >
            {field.options.map((option, index) => (
              <option
                key={index}
                value={option}
                // disabled={option === "Please Select"}
              >
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            className="form-control form-control-lg"
            id={field.name}
            name={field.name}
            value={formData[stepId][field.name]}
            onChange={(e) =>
              handleInputChange(stepId, field.name, e.target.value)
            }
            placeholder={
              field.placeholder ||
              (field.type === "date"
                ? "yyyy-mm-dd"
                : `Enter ${field.label.toLowerCase()}`)
            }
            required={field.required}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* Custom CSS for specific styling */}
      <style>{`
        .step-indicator {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .step-indicator.completed {
          background-color: #198754;
          border-color: #198754;
          color: white;
        }
        
        .step-indicator.current {
          background-color: #0d6efd;
          border-color: #0d6efd;
          color: white;
        }
        
        .step-indicator.pending {
          background-color: #f8f9fa;
          border-color: #dee2e6;
          color: #6c757d;
          cursor: not-allowed;
        }
        
        .step-indicator.clickable:hover:not(.pending) {
          transform: scale(1.05);
        }
        
        .step-connector {
          height: 2px;
          background-color: #dee2e6;
          flex: 1;
          margin: 0 1rem;
        }
        
        .step-connector.completed {
          background-color: #198754;
        }
        
        .previous-step-header {
          background-color: #f8f9fa;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .previous-step-header:hover {
          background-color: #e9ecef;
        }
        
        .status-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 0.5rem;
        }
        
        .status-dot.completed {
          background-color: #198754;
        }
        
        .status-dot.pending {
          background-color: #6c757d;
        }
        
        .form-field-column .mb-4:last-child {
          margin-bottom: 0 !important;
        }
        
        .card {
          height: fit-content;
        }
        
        .accordion-item {
          height: fit-content;
        }
      `}</style>

      <div className="container-fluid bg-light min-vh-100">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Header */}
              <div className="mb-5 text-center">
                <h1 className="display-5 fw-bold text-dark mb-3">
                  Sales Order Form
                </h1>
                <p className="text-muted fs-5">
                  Complete all steps to submit your information
                </p>
              </div>

              {/* Progress Steps */}
              <div className="mb-5">
                <div className="d-flex align-items-center justify-content-center">
                  {formSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = completedSteps.has(index);
                    const isCurrent = index === currentStep;
                    const isClickable =
                      index <= currentStep || completedSteps.has(index);

                    return (
                      <React.Fragment key={step.id}>
                        <div className="d-flex flex-column align-items-center position-relative">
                          <button
                            onClick={() =>
                              isClickable && handleStepClick(index)
                            }
                            disabled={!isClickable}
                            className={`step-indicator ${
                              isCompleted
                                ? "completed"
                                : isCurrent
                                ? "current"
                                : "pending"
                            } ${isClickable ? "clickable" : ""} mb-2`}
                          >
                            {isCompleted ? (
                              <Check size={24} />
                            ) : (
                              <Icon size={24} />
                            )}
                          </button>
                          <div className="text-center">
                            <p
                              className={`small fw-medium mb-1 ${
                                isCurrent
                                  ? "text-primary"
                                  : isCompleted
                                  ? "text-success"
                                  : "text-muted"
                              }`}
                            >
                              Step {index + 1}
                            </p>
                            <p
                              className={`small mb-0 ${
                                isCurrent
                                  ? "text-primary"
                                  : isCompleted
                                  ? "text-success"
                                  : "text-muted"
                              }`}
                            >
                              {step.title}
                            </p>
                          </div>
                        </div>
                        {index < formSteps.length - 1 && (
                          <div
                            className={`step-connector mx-4 ${
                              isCompleted ? "completed" : ""
                            }`}
                            style={{ marginTop: "-40px", width: "100px" }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Previous Steps Content */}
              {currentStep > 0 && (
                <div className="mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h3 className="h5 fw-semibold text-dark mb-4">
                        Previous Steps Summary
                      </h3>

                      {formSteps.slice(0, currentStep).map((step, index) => {
                        const isExpanded = expandedSteps.has(index);

                        return (
                          <div key={step.id} className="border rounded mb-3">
                            <button
                              className="previous-step-header w-100 p-3 d-flex justify-content-between align-items-center"
                              type="button"
                              onClick={() => toggleStepExpansion(index)}
                            >
                              <div className="d-flex align-items-center">
                                <span
                                  className={`status-dot ${
                                    completedSteps.has(index)
                                      ? "completed"
                                      : "pending"
                                  }`}
                                ></span>
                                <span
                                  className={`fw-medium ${
                                    completedSteps.has(index)
                                      ? "text-success"
                                      : "text-muted"
                                  }`}
                                >
                                  {step.title}
                                </span>
                                <span className="text-muted small ms-2">
                                  (Step {index + 1})
                                </span>
                                {step.title === "Date" && (
                                  <>
                                    <span className="text-muted fw-medium ms-2">
                                      Date:{" "}
                                    </span>
                                    {step.fields
                                      .filter(
                                        (field) => field.type !== "header"
                                      )
                                      .map((field) => {
                                        const value =
                                          formData[step.id][field.name];
                                        const displayValue = value || "";

                                        return (
                                          <span
                                            key={field.name}
                                            className="fw-medium text-dark me-3 d-block ms-2"
                                          >
                                            {displayValue ? (
                                              displayValue
                                            ) : (
                                              <em className="text-muted">
                                                Not filled
                                              </em>
                                            )}
                                          </span>
                                        );
                                      })}
                                  </>
                                )}
                              </div>
                              {!(step.title === "Date") && (
                                <div className="d-flex align-items-center">
                                  <span className="text-muted small me-2">
                                    {isExpanded
                                      ? "Hide Details"
                                      : "Show Details"}
                                  </span>
                                  {isExpanded ? (
                                    <ChevronUp
                                      size={18}
                                      className="text-muted"
                                    />
                                  ) : (
                                    <ChevronDown
                                      size={18}
                                      className="text-muted"
                                    />
                                  )}
                                </div>
                              )}
                              {step.title === "Date" && (
                                <div>
                                  <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => handleStepClick(index)}
                                  >
                                    <ChevronLeft size={16} className="me-1" />
                                    Go back to edit this step
                                  </button>
                                </div>
                              )}
                            </button>

                            {isExpanded && !(step.title === "Date") && (
                              <div className="border-top p-3">
                                <div className="row g-3">
                                  {step.fields
                                    .filter((field) => field.type !== "header")
                                    .map((field) => {
                                      const value =
                                        formData[step.id][field.name];
                                      const displayValue = value || "";

                                      return (
                                        <div
                                          key={field.name}
                                          className="col-12"
                                        >
                                          <div>
                                            <small className="text-muted fw-medium">
                                              {field.label}:
                                            </small>
                                            <span className="fw-medium text-dark ms-2">
                                              {displayValue ? (
                                                displayValue
                                              ) : (
                                                <em className="text-muted">
                                                  Not filled
                                                </em>
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>

                                <div className="mt-3 pt-3 border-top">
                                  <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => handleStepClick(index)}
                                  >
                                    <ChevronLeft size={16} className="me-1" />
                                    Go back to edit this step
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Current Form */}
              <div className="card shadow-sm">
                <div className="card-body p-5">
                  <h2 className="h4 fw-semibold text-dark mb-4 text-center">
                    {formSteps[currentStep].title}
                  </h2>

                  {/* Form Fields */}
                  <div className="row justify-content-center">
                    <div className="col-md-10">
                      <div className="form-field-column">
                        <div className="row">
                          {formSteps[currentStep].fields.map((field) =>
                            renderField(field, formSteps[currentStep].id)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className={`btn ${
                        currentStep === 0
                          ? "btn-outline-secondary"
                          : "btn-secondary"
                      } d-flex align-items-center px-4 py-2`}
                      style={{
                        visibility: currentStep === 0 ? "hidden" : "visible",
                      }}
                    >
                      <ChevronLeft size={22} className="me-2" />
                      Previous
                    </button>

                    {currentStep === formSteps.length - 1 ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!isCurrentStepValid}
                        className={`btn ${
                          isCurrentStepValid
                            ? "btn-success"
                            : "btn-outline-success"
                        } d-flex align-items-center px-4 py-2`}
                      >
                        <Check size={22} className="me-2" />
                        Submit
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={!isCurrentStepValid}
                        className={`btn ${
                          isCurrentStepValid
                            ? "btn-primary"
                            : "btn-outline-primary"
                        } d-flex align-items-center px-4 py-2`}
                      >
                        Next
                        <ChevronRight size={22} className="ms-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default App;
