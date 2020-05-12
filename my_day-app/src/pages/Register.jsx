import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Logo from "../img/logo.png";
import Copyright from "../helpers/Copyright";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "#508FF4",
        color: "#FFFFFF",
    }
}));

const initialUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    country: "",
    username: ''
}

const initialErrors = {
    firstName: { value: false, message: '' },
    lastName: { value: false, message: '' },
    email: { value: false, message: '' },
    password: { value: false, message: '' },
    age: { value: false, message: '' },
    country: { value: false, message: '' },
    username: { value: false, message: '' }
}

export default function SignUp() {
    const classes = useStyles();
    const [userData, setUserData] = useState(initialUserData);
    const [errors, setErrors] = useState(initialErrors);
    const [isRedirect, setIsRedirect] = useState(false);

    const valid = (name, value) => {
        if (name === 'email') {
            setErrors({
                ...errors,
                [name]: {
                    value: !/^$|.+@.+..+/.test(value),
                    message: 'Please enter a valid email address!'
                }
            })
        }
        else if (name === 'password') {
            setErrors({
                ...errors,
                [name]: {
                    value: !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value),
                    message: 'Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter!'
                }
            })
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        const field = { [name]: value };

        setUserData({
            ...userData,
            ...field
        });

        valid(name, value)
    }

    const searchForEmptyValues = obj => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key].length === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // TODO: create register() function with fetch (see Calendar.jsx)
    const handleSubmit = e => {
        e.preventDefault();

        if (!searchForEmptyValues(userData)) {
            const fetchData = async () => {
                const API_PATH = `http://localhost:3300/users/register`;
                const reqOpts = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }

                return await fetch(API_PATH, reqOpts)
                    .then(res => {
                        console.log(res);
                        setIsRedirect(true);
                    })
                    .catch(err => console.log(err))
            }

            fetchData();
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img
                    src={Logo}
                    alt={"logo"}
                    style={{ width: "45%", height: "45%" }}
                />
                <br />
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    {" "}
                    {/* TODO: on form submit call register() */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                {
                                    ...(errors.email.value ? {
                                        error: true, 
                                        helperText: errors.email.message
                                    } : {
                                        error: false
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                {
                                    ...(errors.password.value ? {
                                        error: true, 
                                        helperText: errors.password.message
                                    } : {
                                        error: false
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                input
                                type="number" //de modificat
                                InputProps={{
                                    inputProps: { min: 1, max: 100 },
                                }}
                                required
                                fullWidth
                                id="age"
                                label="Age"
                                name="age"
                                autoComplete="age"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="countryLabel">
                                    Country
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    labelId="countryLabel"
                                    id="country"
                                    value={userData.country}
                                    label="Country"
                                    name="country"
                                    style={{ width: 190}}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Afghanistan"}>Afghanistan</MenuItem>
                                    <MenuItem value={"Albania"}>Albania</MenuItem>
                                    <MenuItem value={"Algeria"}>Algeria</MenuItem>
                                    <MenuItem value={"American Samoa"}>American Samoa</MenuItem>
                                    <MenuItem value={"Andorra"}>Andorra</MenuItem>
                                    <MenuItem value={"Angola"}>Angola</MenuItem>
                                    <MenuItem value={"Anguilla"}>Anguilla</MenuItem>
                                    <MenuItem value={"Antigua & Barbuda"}>Antigua & Barbuda</MenuItem>
                                    <MenuItem value={"Argentina"}>Argentina</MenuItem>
                                    <MenuItem value={"Armenia"}>Armenia</MenuItem>
                                    <MenuItem value={"Aruba"}>Aruba</MenuItem>
                                    <MenuItem value={"Australia"}>Australia</MenuItem>
                                    <MenuItem value={"Austria"}>Austria</MenuItem>
                                    <MenuItem value={"Azerbaijan"}>Azerbaijan</MenuItem>
                                    <MenuItem value={"Bahamas"}>Bahamas</MenuItem>
                                    <MenuItem value={"Bahrain"}>Bahrain</MenuItem>
                                    <MenuItem value={"Bangladesh"}>Bangladesh</MenuItem>
                                    <MenuItem value={"Barbados"}>Barbados</MenuItem>
                                    <MenuItem value={"Belarus"}>Belarus</MenuItem>
                                    <MenuItem value={"Belgium"}>Belgium</MenuItem>
                                    <MenuItem value={"Belize"}>Belize</MenuItem>
                                    <MenuItem value={"Benin"}>Benin</MenuItem>
                                    <MenuItem value={"Bermuda"}>Bermuda</MenuItem>
                                    <MenuItem value={"Bhutan"}>Bhutan</MenuItem>
                                    <MenuItem value={"Bolivia"}>Bolivia</MenuItem>
                                    <MenuItem value={"Bonaire"}>Bonaire</MenuItem>
                                    <MenuItem value={"Bosnia & Herzegovina"}>Bosnia & Herzegovina</MenuItem>
                                    <MenuItem value={"Botswana"}>Botswana</MenuItem>
                                    <MenuItem value={"Brazil"}>Brazil</MenuItem>
                                    <MenuItem value={"British Indian Ocean Ter"}>British Indian Ocean Ter</MenuItem>
                                    <MenuItem value={"Brunei"}>Brunei</MenuItem>
                                    <MenuItem value={"Bulgaria"}>Bulgaria</MenuItem>
                                    <MenuItem value={"Burkina Faso"}>Burkina Faso</MenuItem>
                                    <MenuItem value={"Burundi"}>Burundi</MenuItem>
                                    <MenuItem value={"Cambodia"}>Cambodia</MenuItem>
                                    <MenuItem value={"Cameroon"}>Cameroon</MenuItem>
                                    <MenuItem value={"Canada"}>Canada</MenuItem>
                                    <MenuItem value={"Canary Islands"}>Canary Islands</MenuItem>
                                    <MenuItem value={"Cape Verde"}>Cape Verde</MenuItem>
                                    <MenuItem value={"Cayman Islands"}>Cayman Islands</MenuItem>
                                    <MenuItem value={"Central African Republic"}>Central African Republic</MenuItem>
                                    <MenuItem value={"Chad"}>Chad</MenuItem>
                                    <MenuItem value={"Channel Islands"}>Channel Islands</MenuItem>
                                    <MenuItem value={"Chile"}>Chile</MenuItem>
                                    <MenuItem value={"China"}>China</MenuItem>
                                    <MenuItem value={"Christmas Island"}>Christmas Island</MenuItem>
                                    <MenuItem value={"Cocos Island"}>Cocos Island</MenuItem>
                                    <MenuItem value={"Colombia"}>Colombia</MenuItem>
                                    <MenuItem value={"Comoros"}>Comoros</MenuItem>
                                    <MenuItem value={"Congo"}>Congo</MenuItem>
                                    <MenuItem value={"Cook Islands"}>Cook Islands</MenuItem>
                                    <MenuItem value={"Costa Rica"}>Costa Rica</MenuItem>
                                    <MenuItem value={"Cote DIvoire"}>Cote DIvoire</MenuItem>
                                    <MenuItem value={"Croatia"}>Croatia</MenuItem>
                                    <MenuItem value={"Cuba"}>Cuba</MenuItem>
                                    <MenuItem value={"Curacao"}>Curacao</MenuItem>
                                    <MenuItem value={"Cyprus"}>Cyprus</MenuItem>
                                    <MenuItem value={"Czech Republic"}>Czech Republic</MenuItem>
                                    <MenuItem value={"Denmark"}>Denmark</MenuItem>
                                    <MenuItem value={"Djibouti"}>Djibouti</MenuItem>
                                    <MenuItem value={"Dominica"}>Dominica</MenuItem>
                                    <MenuItem value={"Dominican Republic"}>Dominican Republic</MenuItem>
                                    <MenuItem value={"East Timor"}>East Timor</MenuItem>
                                    <MenuItem value={"Ecuador"}>Ecuador</MenuItem>
                                    <MenuItem value={"Egypt"}>Egypt</MenuItem>
                                    <MenuItem value={"El Salvador"}>El Salvador</MenuItem>
                                    <MenuItem value={"Equatorial Guinea"}>Equatorial Guinea</MenuItem>
                                    <MenuItem value={"Eritrea"}>Eritrea</MenuItem>
                                    <MenuItem value={"Estonia"}>Estonia</MenuItem>
                                    <MenuItem value={"Ethiopia"}>Ethiopia</MenuItem>
                                    <MenuItem value={"Falkland Islands"}>Falkland Islands</MenuItem>
                                    <MenuItem value={"Faroe Islands"}>Faroe Islands</MenuItem>
                                    <MenuItem value={"Fiji"}>Fiji</MenuItem>
                                    <MenuItem value={"Finland"}>Finland</MenuItem>
                                    <MenuItem value={"France"}>France</MenuItem>
                                    <MenuItem value={"French Guiana"}>French Guiana</MenuItem>
                                    <MenuItem value={"French Polynesia"}>French Polynesia</MenuItem>
                                    <MenuItem value={"French Southern Ter"}>French Southern Ter</MenuItem>
                                    <MenuItem value={"Gabon"}>Gabon</MenuItem>
                                    <MenuItem value={"Gambia"}>Gambia</MenuItem>
                                    <MenuItem value={"Georgia"}>Georgia</MenuItem>
                                    <MenuItem value={"Germany"}>Germany</MenuItem>
                                    <MenuItem value={"Ghana"}>Ghana</MenuItem>
                                    <MenuItem value={"Gibraltar"}>Gibraltar</MenuItem>
                                    <MenuItem value={"Great Britain"}>Great Britain</MenuItem>
                                    <MenuItem value={"Greece"}>Greece</MenuItem>
                                    <MenuItem value={"Greenland"}>Greenland</MenuItem>
                                    <MenuItem value={"Grenada"}>Grenada</MenuItem>
                                    <MenuItem value={"Guadeloupe"}>Guadeloupe</MenuItem>
                                    <MenuItem value={"Guam"}>Guam</MenuItem>
                                    <MenuItem value={"Guatemala"}>Guatemala</MenuItem>
                                    <MenuItem value={"Guinea"}>Guinea</MenuItem>
                                    <MenuItem value={"Guyana"}>Guyana</MenuItem>
                                    <MenuItem value={"Haiti"}>Haiti</MenuItem>
                                    <MenuItem value={"Hawaii"}>Hawaii</MenuItem>
                                    <MenuItem value={"Honduras"}>Honduras</MenuItem>
                                    <MenuItem value={"Hong Kong"}>Hong Kong</MenuItem>
                                    <MenuItem value={"Hungary"}>Hungary</MenuItem>
                                    <MenuItem value={"Iceland"}>Iceland</MenuItem>
                                    <MenuItem value={"Indonesia"}>Indonesia</MenuItem>
                                    <MenuItem value={"India"}>India</MenuItem>
                                    <MenuItem value={"Iran"}>Iran</MenuItem>
                                    <MenuItem value={"Iraq"}>Iraq</MenuItem>
                                    <MenuItem value={"Ireland"}>Ireland</MenuItem>
                                    <MenuItem value={"Isle of Man"}>Isle of Man</MenuItem>
                                    <MenuItem value={"Israel"}>Israel</MenuItem>
                                    <MenuItem value={"Italy"}>Italy</MenuItem>
                                    <MenuItem value={"Jamaica"}>Jamaica</MenuItem>
                                    <MenuItem value={"Japan"}>Japan</MenuItem>
                                    <MenuItem value={"Jordan"}>Jordan</MenuItem>
                                    <MenuItem value={"Kazakhstan"}>Kazakhstan</MenuItem>
                                    <MenuItem value={"Kenya"}>Kenya</MenuItem>
                                    <MenuItem value={"Kiribati"}>Kiribati</MenuItem>
                                    <MenuItem value={"Korea North"}>Korea North</MenuItem>
                                    <MenuItem value={"Korea South"}>Korea South</MenuItem>
                                    <MenuItem value={"Kuwait"}>Kuwait</MenuItem>
                                    <MenuItem value={"Kyrgyzstan"}>Kyrgyzstan</MenuItem>
                                    <MenuItem value={"Laos"}>Laos</MenuItem>
                                    <MenuItem value={"Latvia"}>Latvia</MenuItem>
                                    <MenuItem value={"Lebanon"}>Lebanon</MenuItem>
                                    <MenuItem value={"Lesotho"}>Lesotho</MenuItem>
                                    <MenuItem value={"Liberia"}>Liberia</MenuItem>
                                    <MenuItem value={"Libya"}>Libya</MenuItem>
                                    <MenuItem value={"Liechtenstein"}>Liechtenstein</MenuItem>
                                    <MenuItem value={"Lithuania"}>Lithuania</MenuItem>
                                    <MenuItem value={"Luxembourg"}>Luxembourg</MenuItem>
                                    <MenuItem value={"Macau"}>Macau</MenuItem>
                                    <MenuItem value={"Macedonia"}>Macedonia</MenuItem>
                                    <MenuItem value={"Madagascar"}>Madagascar</MenuItem>
                                    <MenuItem value={"Malaysia"}>Malaysia</MenuItem>
                                    <MenuItem value={"Malawi"}>Malawi</MenuItem>
                                    <MenuItem value={"Maldives"}>Maldives</MenuItem>
                                    <MenuItem value={"Mali"}>Mali</MenuItem>
                                    <MenuItem value={"Malta"}>Malta</MenuItem>
                                    <MenuItem value={"Marshall Islands"}>Marshall Islands</MenuItem>
                                    <MenuItem value={"Martinique"}>Martinique</MenuItem>
                                    <MenuItem value={"Mauritania"}>Mauritania</MenuItem>
                                    <MenuItem value={"Mauritius"}>Mauritius</MenuItem>
                                    <MenuItem value={"Mayotte"}>Mayotte</MenuItem>
                                    <MenuItem value={"Mexico"}>Mexico</MenuItem>
                                    <MenuItem value={"Midway Islands"}>Midway Islands</MenuItem>
                                    <MenuItem value={"Moldova"}>Moldova</MenuItem>
                                    <MenuItem value={"Monaco"}>Monaco</MenuItem>
                                    <MenuItem value={"Mongolia"}>Mongolia</MenuItem>
                                    <MenuItem value={"Montserrat"}>Montserrat</MenuItem>
                                    <MenuItem value={"Morocco"}>Morocco</MenuItem>
                                    <MenuItem value={"Mozambique"}>Mozambique</MenuItem>
                                    <MenuItem value={"Myanmar"}>Myanmar</MenuItem>
                                    <MenuItem value={"Nambia"}>Nambia</MenuItem>
                                    <MenuItem value={"Nauru"}>Nauru</MenuItem>
                                    <MenuItem value={"Nepal"}>Nepal</MenuItem>
                                    <MenuItem value={"Netherland Antilles"}>Netherland Antilles</MenuItem>
                                    <MenuItem value={"Netherlands (Holland, Europe)"}>Netherlands (Holland, Europe'</MenuItem>
                                    <MenuItem value={"Nevis"}>Nevis</MenuItem>
                                    <MenuItem value={"New Caledonia"}>New Caledonia</MenuItem>
                                    <MenuItem value={"New Zealand"}>New Zealand</MenuItem>
                                    <MenuItem value={"Nicaragua"}>Nicaragua</MenuItem>
                                    <MenuItem value={"Niger"}>Niger</MenuItem>
                                    <MenuItem value={"Nigeria"}>Nigeria</MenuItem>
                                    <MenuItem value={"Niue"}>Niue</MenuItem>
                                    <MenuItem value={"Norfolk Island"}>Norfolk Island</MenuItem>
                                    <MenuItem value={"Norway"}>Norway</MenuItem>
                                    <MenuItem value={"Oman"}>Oman</MenuItem>
                                    <MenuItem value={"Pakistan"}>Pakistan</MenuItem>
                                    <MenuItem value={"Palau Island"}>Palau Island</MenuItem>
                                    <MenuItem value={"Palestine"}>Palestine</MenuItem>
                                    <MenuItem value={"Panama"}>Panama</MenuItem>
                                    <MenuItem value={"Papua New Guinea"}>Papua New Guinea</MenuItem>
                                    <MenuItem value={"Paraguay"}>Paraguay</MenuItem>
                                    <MenuItem value={"Peru"}>Peru</MenuItem>
                                    <MenuItem value={"Philippines"}>Philippines</MenuItem>
                                    <MenuItem value={"Pitcairn Island"}>Pitcairn Island</MenuItem>
                                    <MenuItem value={"Poland"}>Poland</MenuItem>
                                    <MenuItem value={"Portugal"}>Portugal</MenuItem>
                                    <MenuItem value={"Puerto Rico"}>Puerto Rico</MenuItem>
                                    <MenuItem value={"Qatar"}>Qatar</MenuItem>
                                    <MenuItem value={"Republic of Montenegro"}>Republic of Montenegro</MenuItem>
                                    <MenuItem value={"Republic of Serbia"}>Republic of Serbia</MenuItem>
                                    <MenuItem value={"Reunion"}>Reunion</MenuItem>
                                    <MenuItem value={"Romania"}>Romania</MenuItem>
                                    <MenuItem value={"Russia"}>Russia</MenuItem>
                                    <MenuItem value={"Rwanda"}>Rwanda</MenuItem>
                                    <MenuItem value={"St Barthelemy"}>St Barthelemy</MenuItem>
                                    <MenuItem value={"St Eustatius"}>St Eustatius</MenuItem>
                                    <MenuItem value={"St Helena"}>St Helena</MenuItem>
                                    <MenuItem value={"St Kitts-Nevis"}>St Kitts-Nevis</MenuItem>
                                    <MenuItem value={"St Lucia"}>St Lucia</MenuItem>
                                    <MenuItem value={"St Maarten"}>St Maarten</MenuItem>
                                    <MenuItem value={"St Pierre & Miquelon"}>St Pierre & Miquelon</MenuItem>
                                    <MenuItem value={"St Vincent & Grenadines"}>St Vincent & Grenadines</MenuItem>
                                    <MenuItem value={"Saipan"}>Saipan</MenuItem>
                                    <MenuItem value={"Samoa"}>Samoa</MenuItem>
                                    <MenuItem value={"Samoa American"}>Samoa American</MenuItem>
                                    <MenuItem value={"San Marino"}>San Marino</MenuItem>
                                    <MenuItem value={"Sao Tome & Principe"}>Sao Tome & Principe</MenuItem>
                                    <MenuItem value={"Saudi Arabia"}>Saudi Arabia</MenuItem>
                                    <MenuItem value={"Senegal"}>Senegal</MenuItem>
                                    <MenuItem value={"Seychelles"}>Seychelles</MenuItem>
                                    <MenuItem value={"Sierra Leone"}>Sierra Leone</MenuItem>
                                    <MenuItem value={"Singapore"}>Singapore</MenuItem>
                                    <MenuItem value={"Slovakia"}>Slovakia</MenuItem>
                                    <MenuItem value={"Slovenia"}>Slovenia</MenuItem>
                                    <MenuItem value={"Solomon Islands"}>Solomon Islands</MenuItem>
                                    <MenuItem value={"Somalia"}>Somalia</MenuItem>
                                    <MenuItem value={"South Africa"}>South Africa</MenuItem>
                                    <MenuItem value={"Spain"}>Spain</MenuItem>
                                    <MenuItem value={"Sri Lanka"}>Sri Lanka</MenuItem>
                                    <MenuItem value={"Sudan"}>Sudan</MenuItem>
                                    <MenuItem value={"Suriname"}>Suriname</MenuItem>
                                    <MenuItem value={"Swaziland"}>Swaziland</MenuItem>
                                    <MenuItem value={"Sweden"}>Sweden</MenuItem>
                                    <MenuItem value={"Switzerland"}>Switzerland</MenuItem>
                                    <MenuItem value={"Syria"}>Syria</MenuItem>
                                    <MenuItem value={"Tahiti"}>Tahiti</MenuItem>
                                    <MenuItem value={"Taiwan"}>Taiwan</MenuItem>
                                    <MenuItem value={"Tajikistan"}>Tajikistan</MenuItem>
                                    <MenuItem value={"Tanzania"}>Tanzania</MenuItem>
                                    <MenuItem value={"Thailand"}>Thailand</MenuItem>
                                    <MenuItem value={"Togo"}>Togo</MenuItem>
                                    <MenuItem value={"Tokelau"}>Tokelau</MenuItem>
                                    <MenuItem value={"Tonga"}>Tonga</MenuItem>
                                    <MenuItem value={"Trinidad & Tobago"}>Trinidad & Tobago</MenuItem>
                                    <MenuItem value={"Tunisia"}>Tunisia</MenuItem>
                                    <MenuItem value={"Turkey"}>Turkey</MenuItem>
                                    <MenuItem value={"Turkmenistan"}>Turkmenistan</MenuItem>
                                    <MenuItem value={"Turks & Caicos Is"}>Turks & Caicos Is</MenuItem>
                                    <MenuItem value={"Tuvalu"}>Tuvalu</MenuItem>
                                    <MenuItem value={"Uganda"}>Uganda</MenuItem>
                                    <MenuItem value={"United Kingdom"}>United Kingdom</MenuItem>
                                    <MenuItem value={"Ukraine"}>Ukraine</MenuItem>
                                    <MenuItem value={"United Arab Emirates"}>United Arab Emirates</MenuItem>
                                    <MenuItem value={"United States of America"}>United States of America</MenuItem>
                                    <MenuItem value={"Uruguay"}>Uruguay</MenuItem>
                                    <MenuItem value={"Uzbekistan"}>Uzbekistan</MenuItem>
                                    <MenuItem value={"Vanuatu"}>Vanuatu</MenuItem>
                                    <MenuItem value={"Vatican City State"}>Vatican City State</MenuItem>
                                    <MenuItem value={"Venezuela"}>Venezuela</MenuItem>
                                    <MenuItem value={"Vietnam"}>Vietnam</MenuItem>
                                    <MenuItem value={"Virgin Islands (Brit)"}>Virgin Islands (Brit'</MenuItem>
                                    <MenuItem value={"Virgin Islands (USA)"}>Virgin Islands (USA'</MenuItem>
                                    <MenuItem value={"Wake Island"}>Wake Island</MenuItem>
                                    <MenuItem value={"Wallis & Futana Is"}>Wallis & Futana Is</MenuItem>
                                    <MenuItem value={"Yemen"}>Yemen</MenuItem>
                                    <MenuItem value={"Zaire"}>Zaire</MenuItem>
                                    <MenuItem value={"Zambia"}>Zambia</MenuItem>
                                    <MenuItem value={"Zimbabwe"}>Zimbabwe</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            {isRedirect && <Redirect
                to={{
                    pathname: "/"
                }}
            />}
        </Container>
    );
}
