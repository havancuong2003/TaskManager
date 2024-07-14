import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    IconButton,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import {
    isValidTime,
    formatTime,
    checkTimeConflict,
    sortTasksByTime,
} from "../../utils/timeUtil";
import CloseIcon from "@mui/icons-material/Close";

const UpdateTemplateModal = ({
    open,
    handleClose,
    templateData,
    updateTemplate,
    userID,
}) => {
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({
        start: "",
        end: "",
        activity: "",
        location: "",
        description: "",
        userId: userID,
    });
    const [error, setError] = useState("");
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState(null);

    useEffect(() => {
        // Set initial template data when modal opens
        setTemplates(templateData);
    }, [templateData]);

    const handleInputChange = (index, field, value) => {
        // Update the field value for the specific template object
        const updatedTemplates = [...templates];
        updatedTemplates[index] = {
            ...updatedTemplates[index],
            [field]: value,
        };
        setTemplates(updatedTemplates);
    };

    const handleOpenDeleteConfirmation = (index) => {
        setTemplateToDelete(templates[index]);
        setDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
        setTemplateToDelete(null);
    };

    const handleConfirmDeleteTemplate = async () => {
        const index = templates.findIndex((t) => t.id === templateToDelete.id);
        if (index === -1) {
            console.error("Template to delete not found in current templates.");
            return;
        }

        const updatedTemplates = [...templates];
        updatedTemplates.splice(index, 1);
        setTemplates(updatedTemplates);

        try {
            // Perform delete operation in the backend
            await fetch(
                `http://localhost:9999/template/${templateToDelete.id}`,
                {
                    method: "DELETE",
                }
            );

            // Close the confirmation dialog
            handleCloseDeleteConfirmation();

            // Trigger parent component function to update state after deleting
            updateTemplate();
        } catch (error) {
            console.error("Error deleting template: ", error);
            // Restore deleted template on error
            updatedTemplates.splice(index, 0, templateToDelete);
            setTemplates(updatedTemplates);
        }
    };

    const handleAddTemplate = async () => {
        // Validate the new template before adding
        const { start, end } = newTemplate;

        // Validate the time format
        if (!isValidTime(start) || !isValidTime(end)) {
            setError("Invalid time format. Please use HH:mm.");
            return;
        }

        // Format the time
        newTemplate.start = formatTime(start);
        newTemplate.end = formatTime(end);

        // Check for time conflicts
        if (checkTimeConflict(newTemplate, templates)) {
            setError("Time conflict detected. Please choose a different time.");
            return;
        }

        try {
            // Add the new template to the database
            const response = await fetch("http://localhost:9999/template", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTemplate),
            });
            if (!response.ok) {
                throw new Error("Failed to add new template.");
            }

            // Reset the new template form
            setNewTemplate({
                start: "",
                end: "",
                activity: "",
                location: "",
                description: "",
                userId: userID,
            });

            // Close the modal after adding new template
            handleClose();
            // Trigger parent component function to update state after adding
            updateTemplate();
        } catch (error) {
            console.error("Error adding new template: ", error);
            setError("Failed to add new template.");
        }
    };

    const handleSaveChanges = async () => {
        // Validate and check for conflicts before saving changes
        for (let i = 0; i < templates.length; i++) {
            const { start, end } = templates[i];

            // Validate the time format
            if (!isValidTime(start) || !isValidTime(end)) {
                setError(
                    `Invalid time format for task ${i + 1}. Please use HH:mm.`
                );
                return;
            }

            // Format the time
            templates[i].start = formatTime(start);
            templates[i].end = formatTime(end);

            // Check for time conflicts
            const otherTemplates = templates.filter((_, index) => index !== i);
            if (checkTimeConflict(templates[i], otherTemplates)) {
                setError(
                    `Time conflict detected for task ${
                        i + 1
                    }. Please choose a different time.`
                );
                return;
            }
        }

        try {
            // Update each template object in the database
            for (let template of templates) {
                await fetch(`http://localhost:9999/template/${template.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(template),
                });
            }
            // Close the modal after saving changes
            handleClose();
            // Trigger parent component function to update state after saving
            updateTemplate();
        } catch (error) {
            console.error("Error updating templates: ", error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="update-template-modal"
            aria-describedby="modal-to-update-template"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    overflowY: "auto",
                    maxHeight: "80vh", // Adjust max height as needed
                }}
            >
                <Typography variant="h6" id="modal-modal-title">
                    Update Template
                </Typography>
                {templates.map((template, index) => (
                    <Paper key={template.id} sx={{ p: 2, mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <TextField
                                    label="Start Time"
                                    fullWidth
                                    value={template.start}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "start",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label="End Time"
                                    fullWidth
                                    value={template.end}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "end",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                sx={{ display: "flex", alignItems: "flex-end" }}
                            >
                                <IconButton
                                    aria-label="delete"
                                    onClick={() =>
                                        handleOpenDeleteConfirmation(index)
                                    }
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Activity"
                                    fullWidth
                                    value={template.activity}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "activity",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Location"
                                    fullWidth
                                    value={template.location}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "location",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    value={template.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Box mt={2}>
                    <Typography variant="h6">Add New Template</Typography>
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <TextField
                                    label="Start Time"
                                    fullWidth
                                    value={newTemplate.start}
                                    onChange={(e) =>
                                        setNewTemplate({
                                            ...newTemplate,
                                            start: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label="End Time"
                                    fullWidth
                                    value={newTemplate.end}
                                    onChange={(e) =>
                                        setNewTemplate({
                                            ...newTemplate,
                                            end: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddTemplate}
                                >
                                    Add
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Activity"
                                    fullWidth
                                    value={newTemplate.activity}
                                    onChange={(e) =>
                                        setNewTemplate({
                                            ...newTemplate,
                                            activity: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Location"
                                    fullWidth
                                    value={newTemplate.location}
                                    onChange={(e) =>
                                        setNewTemplate({
                                            ...newTemplate,
                                            location: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    value={newTemplate.description}
                                    onChange={(e) =>
                                        setNewTemplate({
                                            ...newTemplate,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                {error && (
                    <Typography color="error" variant="body2" mt={1}>
                        {error}
                    </Typography>
                )}
                <Box mt={2} textAlign="right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </Button>
                </Box>
                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteConfirmationOpen}
                    onClose={handleCloseDeleteConfirmation}
                    aria-labelledby="delete-template-dialog-title"
                    aria-describedby="delete-template-dialog-description"
                >
                    <DialogTitle id="delete-template-dialog-title">
                        Confirm Delete Template
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-template-dialog-description">
                            Are you sure you want to delete this template?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseDeleteConfirmation}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDeleteTemplate}
                            color="error"
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Modal>
    );
};

export default UpdateTemplateModal;
