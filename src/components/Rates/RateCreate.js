import { TextField, Typography, Button } from "@mui/material"
import { useState } from "react";
import axios from '../../api/axios'

const initialValues = {
    name: '',
    garage: {
        hourly: '',
        three: '',
        six: '',
        twelve: '',
        twenty_four: ''
    },
    no_garage: {
        hourly: '',
        three: '',
        six: '',
        twelve: '',
        twenty_four: ''
    },
    extra_towel: '',
    extra_pillow: '',
    extra_blanket: '',
    extra_single_bed: '',
    extra_double_bed: '',
    extra_person: ''
};

const CREATE_RATE_URL = "/rates/create";

const RateCreate = (props) => {
    const { setOpenModal } = props
    const [values, setValues] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleGarageChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            garage: {
                ...values.garage,
                [name]: value
            }
        }));
    }

    const handleNoGarageChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            no_garage: {
                ...values.no_garage,
                [name]: value
            }
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(CREATE_RATE_URL, { ...values });
            setOpenModal(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td colSpan={2}>
                        <TextField
                            variant="filled"
                            label='Rate Name'
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                            sx={{ width: "100%" }}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={6}>
                        <Typography variant="h6" align="center" sx={{ marginLeft: "1vw" }}>
                            Room Rates
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: "16.67%" }}>
                        <Typography variant="h6" sx={{ marginLeft: "1vw" }}>
                            Garage
                        </Typography>
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Hourly'
                            name="hourly"
                            value={values.garage.hourly}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='3 Hours'
                            name="three"
                            value={values.garage.three}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='6 Hours'
                            name="six"
                            value={values.garage.six}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='12 Hours'
                            name="twelve"
                            value={values.garage.twelve}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='24 Hours'
                            name="twenty_four"
                            value={values.garage.twenty_four}
                            onChange={handleGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                </tr>
                <tr>
                    <td style={{ width: "16.67%" }}>
                        <Typography variant="h6" sx={{ marginLeft: "1vw" }}>
                            Without Garage
                        </Typography>
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Hourly'
                            name="hourly"
                            value={values.no_garage.hourly}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='3 Hours'
                            name="three"
                            value={values.no_garage.three}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='6 Hours'
                            name="six"
                            value={values.no_garage.six}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='12 Hours'
                            name="twelve"
                            value={values.no_garage.twelve}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='24 Hours'
                            name="twenty_four"
                            value={values.no_garage.twenty_four}
                            onChange={handleNoGarageChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={6}>
                        <Typography variant="h6" align="center" sx={{ marginLeft: "1vw" }}>
                            Amenities
                        </Typography>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Towel'
                            name="extra_towel"
                            value={values.extra_towel}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Pillow'
                            name="extra_pillow"
                            value={values.extra_pillow}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Blanket'
                            name="extra_blanket"
                            value={values.extra_blanket}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Single Bed'
                            name="extra_single_bed"
                            value={values.extra_single_bed}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Double Bed'
                            name="extra_double_bed"
                            value={values.extra_double_bed}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                    <td style={{ width: "16.67%" }}>
                        <TextField
                            type="number"
                            variant="filled"
                            label='Extra Person'
                            name="extra_person"
                            value={values.extra_person}
                            onChange={handleInputChange}
                            required
                            autoComplete='off'
                        />
                    </td>
                </tr>
            </table>


            <div style={{ textAlign: "center" }}>
                <Button variant="contained" type="submit" sx={{ margin: "20px 6px" }}>Confirm</Button>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ margin: "0 6px" }}>Cancel</Button>
            </div>
        </form>
    )
}

export default RateCreate;