import Contact from "../models/Contact.js";

const sendMessage = async (req, res) => {
    try {
        const message = await Contact.create(req.body);
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Message sent successfully',
            data: message
        });
        
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}


const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort('-createdAt');

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

const getMessage = async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                error: 'Message not found'
            });
        }

        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

const updateMessageStatus = async (req, res) => {
    try {
        let message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                error: 'Message not found'
            });
        }

        message = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: req.body.read },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                error: 'Message not found'
            });
        }

        await message.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};


export default { sendMessage, getMessages, getMessage, deleteMessage, updateMessageStatus }