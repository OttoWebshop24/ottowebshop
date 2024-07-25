import React, { useState, useEffect } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Button,
    Icon,
    Drawer,
    Box
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import InfoIcon from '@material-ui/icons/Info';
import useStyles from './styles';
import EcoIcon from '../../../assets/icon.svg';
import AEfficiency from '../../../assets/A_efficiency.svg';
import BEfficiency from '../../../assets/B_efficiency.svg';
import CEfficiency from '../../../assets/C_efficiency.svg';
import DEfficiency from '../../../assets/D_efficiency.svg';
import EEfficiency from '../../../assets/E_efficiency.svg';
import SaveElectricityTable from '../../../assets/Table.png';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [stromSparenOpen, setStromSparenOpen] = useState(false);
    const parseInputString = (str) => str.split('%%');

    const [productAttributes, setProductAttributes] = useState([]);

    const handleAddToCart = () => onAddToCart(product.id, 1);
    const handleDrawerOpenEfficiency = () => {
        let element =  window.results.eEfficiencyCounter.find(el => el.name === product.name);
        if (element) {
            // Wenn das Element gefunden wurde, erhöhe den Counter
            element.counter++;
        } else {
            // Wenn das Element nicht gefunden wurde, füge es hinzu
            window.results.eEfficiencyCounter.push({ name: product.name, counter: 1 });
        }
        setDrawerOpen(true);
    }
    const handleDrawerOpenStromSparen = () => {
        let element =  window.results.saveElectricityCounter.find(el => el.name === product.name);
        if (element) {
            // Wenn das Element gefunden wurde, erhöhe den Counter
            element.counter++;
        } else {
            // Wenn das Element nicht gefunden wurde, füge es hinzu
            window.results.saveElectricityCounter.push({ name: product.name, counter: 1 });
        }
        setStromSparenOpen(true);
    }
    const handleDrawerClose = () => setDrawerOpen(false);
    const handleStromSparenClose = () => setStromSparenOpen(false);

    const svgIcon = (
        <Icon>
            <img src={EcoIcon} className={classes.iconImage} />
        </Icon>
    );

    const renderSaveEnergyTag = () => {
        const efficiencyClass = getEfficiencyClass();
        return efficiencyClass === "A" && window.results.eEfficiencyGroup === "B" ? (
            <Box className={classes.saveEnergyTag} onClick={handleDrawerOpenStromSparen}>
                <Typography variant="body2" className={classes.saveEnergyText}>
                    {productAttributes[6] !== "</p>" && productAttributes ? productAttributes[6] : 0} € Stromkosten sparen
                </Typography>
                <Typography variant="caption" className={classes.saveEnergySubText}>
                    Warum sich ein Klasse {efficiencyClass} Gerät lohnt
                </Typography>
                <InfoIcon className={classes.infoIcon} />
            </Box>
        ) : (
            <div className={classes.saveEnergyTagPlaceholder} />
        );
    };

    const renderProductInfo = () => (
        <div className={classes.productInfo}>
            <div className={classes.productInfoItem}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Einbauart:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {productAttributes ? productAttributes[1] : ""}
                </Typography>
            </div>
            <div className={classes.productInfoItem}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Farbe:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {productAttributes ? productAttributes[2] : ""}
                </Typography>
            </div>
            <div className={classes.productInfoItem}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Anzahl Maßgedecke:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {productAttributes ? productAttributes[3] : ""}
                </Typography>
            </div>
            <div className={classes.productInfoItem}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Höhe:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {productAttributes ? productAttributes[4] : ""} cm
                </Typography>
            </div>
            <div className={classes.productInfoItem}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Breite:</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {productAttributes ? productAttributes[5] : ""} cm
                </Typography>
            </div>
        </div>
    );

    const efficiencyImages = {
        A: AEfficiency,
        B: BEfficiency,
        C: CEfficiency,
        D: DEfficiency,
        E: EEfficiency,
    };

    const getEfficiencyClass = () => {
        if (product.categories && product.categories.length > 0) {
            const categoryName = product.categories[0].name;
            switch (categoryName) {
                case 'A':
                    return 'A';
                case 'B':
                    return 'B';
                case 'C':
                    return 'C';
                case 'D':
                    return 'D';
                case 'E':
                    return 'E';
                default:
                    return 'A'; // Standardwert, falls keine passende Kategorie gefunden wird
            }
        }
        return 'A'; // Standardwert, falls keine Kategorie vorhanden ist
    };

    const getEEfficiencyText = (efficiencyClass) => {
        switch (efficiencyClass) {
            case 'A':
                return (
                    <p>Diese Geschirrsp&uuml;ler sind besonders energieeffizient und helfen dir, Stromkosten zu sparen und die Umwelt zu schonen. Umfasst der Geschirrsp&uuml;ler etwa 13 bis 14 Ma&szlig;gedecke, liegt der Verbrauch durchschnittlich bei 54 kWh.</p>
                );
            case 'B':
                return (
                    <p>Diese Geschirrsp&uuml;ler sind energieeffizient und bieten eine gute Balance zwischen Leistung und Energieverbrauch. Umfasst der Geschirrsp&uuml;ler etwa 13 bis 14 Ma&szlig;gedecke, liegt der Verbrauch durchschnittlich bei 64 kWh.</p>
                );
            case 'C':
                return (
                    <p>Diese Geschirrsp&uuml;ler haben einen durchschnittlichen Energieverbrauch und sind eine solide Wahl f&uuml;r den t&auml;glichen Gebrauch. Umfasst der Geschirrsp&uuml;ler etwa 13 bis 14 Ma&szlig;gedecke, liegt der Verbrauch durchschnittlich bei 75 kWh.</p>
                );
            case 'D':
                return (
                    <p>Diese Geschirrsp&uuml;ler verbrauchen mehr Energie als h&ouml;her eingestufte Modelle und sind weniger effizient. Umfasst der Geschirrsp&uuml;ler etwa 13 bis 14 Ma&szlig;gedecke, liegt der Verbrauch durchschnittlich bei 85 kWh.</p>
                );
            case 'E':
                return (
                    <p>Diese Geschirrsp&uuml;ler haben den h&ouml;chsten Energieverbrauch und sind am wenigsten energieeffizient. Umfasst der Geschirrsp&uuml;ler etwa 13 bis 14 Ma&szlig;gedecke, liegt der Verbrauch durchschnittlich bei 95 kWh.</p>
                );
            default:
                return null;
        }
    };

    const renderDrawerContent = () => {
        const efficiencyClass = getEfficiencyClass();
        return (
            <div className={classes.drawerContent}>
                <IconButton className={classes.closeButton} onClick={handleDrawerClose}>
                    X
                </IconButton>
                <Typography variant="h6">Energieeffizienzklasse {efficiencyClass}</Typography>
                <img
                    src={efficiencyImages[efficiencyClass]}
                    alt={`Energieeffizienzklasse ${efficiencyClass}`}
                    width="60%"
                />
                <Typography className={classes.efficiencyBody} variant="body2" paragraph>
                    {getEEfficiencyText(efficiencyClass)}
                </Typography>
            </div>
        );
    };

    const renderStromSparenContent = () => {
        return (
            <div className={classes.drawerContent}>
                <IconButton className={classes.closeButton} onClick={handleStromSparenClose}>
                    X
                </IconButton>
                <Typography variant="h6"><strong>A lohnt sich!</strong></Typography>
                <Typography variant="body2" paragraph>
                    <p>Investiere in Energieeffizienz und spare langfristig &ndash; f&uuml;r dich und die Umwelt!</p>
                    <p>Wer ein Haushaltsger&auml;t kauft, sieht zun&auml;chst nur die Anschaffungskosten. Was viele nicht bedenken: Energieeffiziente Ger&auml;te verbrauchen deutlich weniger Strom, sodass diese Ger&auml;te an <strong>ihrem Lebensende</strong> unterm Strich <strong>sogar g&uuml;nstiger sein</strong> k&ouml;nnen als ihre Alternativen mit h&ouml;herem Stromverbrauch und niedrigerem Preis.</p>
                    <p>Konkret gesagt: Bei einem 4-Personen-Haushalt hast du nach einer &uuml;blichen Verwendungsdauer von 12 Jahren mit einem Ger&auml;t der Klasse A<strong> durchschnittlich ca. 590 Euro*</strong> an Stromkosten gegen&uuml;ber einem Ger&auml;t der Klasse E gespart. Und danach geht das Sparen weiter!</p>
                    <p>In der Tabelle siehst du je nach Haushaltsgr&ouml;&szlig;e <strong>wie viel Geld du durchschnittlich in Euro (&euro;)</strong> nach einer Benutzungsdauer von 12 Jahren <strong>sparst</strong>, wenn du dich f&uuml;r ein A- statt einem B-, A- statt C-, A- statt D- oder A- statt E-Ger&auml;t (linke Spalte) entscheidest.</p>
                    <img
                        src={SaveElectricityTable}
                        alt={`Strom sparen`}
                        width="100%"
                    />
                    <p><span style={{color:'#999999'}}>*Quelle Verbraucherzentrale Bundesverband e.V. &bull;</span></p>
                    <p><span style={{color:'#999999'}}>Berechnung: Strompreis Juli 2024 Deutschland: 41, 35 ct/kWh; Quelle: Bundesverband der Energie- und Wasserwirtschaft e.V. &bull; Gewichteter Verbrauch in kWh pro 100 Zyklen.</span></p>
                    <p><span style={{color:'#999999'}}>Klasse A: &Oslash; 54 kWh; Klasse B: &Oslash; 64 kWh; Klasse C: 75 &Oslash; kWh; Klasse D: &Oslash; 85 kW; Klasse E: &Oslash; 95 kWh.</span></p>
                </Typography>
            </div>
        );
    };

    useEffect(() => {
        // Parse the input string and set the initial state
        setProductAttributes(parseInputString(product.description));
    }, [product]);

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} />
            {renderSaveEnergyTag()}
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                </Typography>
                <Button className={classes.efficiencyClass} onClick={handleDrawerOpenEfficiency}>
                    <img width="40px" height="40px" src={efficiencyImages[getEfficiencyClass()]} alt="Energieeffizienzklasse" />
                </Button>
                {renderProductInfo()} {/* Produktinformationen */}
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Typography variant="h6" className={classes.price}>
                    {product.price.formatted}€
                </Typography>
                <IconButton
                    aria-label="Add to Cart"
                    onClick={handleAddToCart}
                    className={classes.addToCartButton}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                {renderDrawerContent()}
            </Drawer>
            <Drawer anchor="right" open={stromSparenOpen} onClose={handleStromSparenClose}>
                {renderStromSparenContent()}
            </Drawer>
        </Card>
    );
};

export default Product;
