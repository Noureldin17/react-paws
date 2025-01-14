import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';

interface VetConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const VetConsultationModal: React.FC<VetConsultationModalProps> = ({ isOpen, onClose }) => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        // Simulate a success interaction
        setTimeout(() => {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Contact a Vet</DialogTitle>
            <DialogContent>
                {success ? (
                    <Typography className="text-green-600 font-bold text-center">
                        Thank you! Someone from our vet team will contact you soon.
                    </Typography>
                ) : (
                    <>
                        <TextField
                            label="Phone Number"
                            type="tel"
                            fullWidth
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            label="Message"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </>
                )}
            </DialogContent>
            {!success && (
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={!phone || !message}
                    >
                        Submit
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default VetConsultationModal;
