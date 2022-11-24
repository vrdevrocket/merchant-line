import styled from "styled-components";
import { theme } from "@utils";
export const StyledChoosePlan = styled.div`
    html {
        overflow: visible !important;
    }
    a:hover {
        color: var(--hover) !important;
        text-decoration: none;
    }
    .font-weight-bold {
        font-weight: 600 !important;
    }
    b,
    strong {
        font-weight: 600 !important;
    }
    /* Hover Menu */
    .btn.focus,
    .btn:focus {
        outline: none !important;
        box-shadow: none;
    }
    body {
        margin-top: 78px;
    }
    .topRightMenu {
        display: flex;
    }
    .langDiv svg {
        width: 25px;
    }
    .langDiv {
        display: flex;
        place-items: center;
    }
    .langDiv .dropdown-menu {
        min-width: auto;
        left: -12px;
    }
    .customDpDown {
        padding-right: 5px !important;
    }
    .customBtn {
        background: var(--primary);
        border-radius: 6px;
        /* width: 110px; */
        /* height: 45px; */
        padding: 15px 25px;
        display: flex;
        flex-direction: row;
        color: #fff;
        justify-content: center;
        align-items: center;
        border: none;
        font-size: 15px !important;
    }
    .gform_button {
        background: var(--primary);
        border-radius: 6px;
        /* width: 110px; */
        /* height: 45px; */
        padding: 15px 25px;
        display: flex;
        flex-direction: row;
        color: #fff;
        justify-content: center;
        align-items: center;
        border: none;
        font-size: 15px !important;
    }
    .wpml-ls-legacy-dropdown-click {
        width: auto;
    }
    .book {
        width: 110px;
        height: 45px;
        padding: 0;
    }
    .book:lang(th) {
        width: auto;
    }
    .book li {
        color: #fff !important;
    }
    .customBtn:hover {
        background: var(--hover);
    }
    a button:focus {
        background: var(--hover) !important;
    }
    .gform_button:hover {
        background: var(--hover);
    }
    .customWhiteBtn {
        background: #fff;
        border-radius: 6px;
        width: 120px;
        height: 45px;
        display: flex;
        flex-direction: row;
        color: var(--primary);
        justify-content: center;
        align-items: center;
        border: none;
        font-size: 15px !important;
    }
    .customWhiteBtn:hover {
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
    }
    .customBorderBtn {
        border: 1px solid var(--primary);
        background: transparent;
        border-radius: 6px;
        width: 270px;
        height: 45px;
        display: flex;
        flex-direction: row;
        color: var(--primary);
        justify-content: center;
        align-items: center;
        font-size: 15px !important;
    }
    .customBorderBtn:hover {
        background: var(--primary);
        color: #fff;
        border: transparent;
    }
    .customWhiteBorderBtn {
        border: 1px solid #fff;
        background: transparent;
        border-radius: 6px;
        width: 270px;
        height: 45px;
        display: flex;
        flex-direction: row;
        color: #fff;
        justify-content: center;
        align-items: center;
        font-size: 15px !important;
    }
    .customWhiteBorderBtn:hover {
        background: #fff;
        color: var(--primary);
        /* border: transparent; */
    }
    .learnMoreBtn {
        background: transparent;
        display: flex;
        flex-direction: row;
        color: var(--secondary);
        justify-content: center;
        align-items: center;
        font-size: 15px !important;
        font-weight: bold;
        border: none;
    }
    .learnMoreBtn:hover {
        color: var(--secondaryHover);
    }
    .learnMoreBtn svg {
        margin-left: 5px;
        width: 22px;
    }
    button {
        font-size: 15px !important;
    }
    .book a {
        color: #fff !important;
        padding: 3px 10px 2px 10px !important;
        font-size: 15px !important;
    }
    .innerTopDiv h1 {
        font-size: 24pt;
        font-weight: 600;
        color: #fff;
        margin: 0;
    }
    .navbar-nav .nav-item.active > a {
        color: #e10a17 !important;
    }
    .navbar-nav .nav-item.active > a:hover ~ .nav-item.underline::after {
        display: none;
    }
    li.nav-item.underline {
        display: flex;
        flex: none;
        color: var(--primary) !important;
    }
    li.nav-item {
        position: relative;
    }
    button:hover {
        background-color: transparent;
    }
    .dropdown:hover .dropdown-menu {
        display: block;
        text-align: left;
        margin-top: 0;
    }
    .navbar-expand-md .navbar-nav .dropdown:hover .dropdown-menu {
        display: block;
        text-align: left;
        margin-top: 0;
    }
    .dropdown-item:focus {
        background: #f8f9f1;
    }
    .dropdown-toggle::after {
        margin-right: 0.255em;
    }
    .dropdown-item {
        font-size: 10pt;
        font-weight: 300;
    }

    .dropdown-item.active {
        background: transparent;
        color: #000;
    }
    /* End Hover Menu*/
    .nav-item {
        margin: 0 7px !important;
        font-size: 14px;
    }
    .navbar-nav {
        font-family: "SF Thonburi" !important;
    }
    /* Remove Border Toggle Menu */
    .navbar-light .navbar-toggler {
        border-color: transparent;
        outline: none;
    }
    /* End Remove Border Toggle Menu */
    .logo {
        width: 120px;
    }
    /* Hamburger Menu */

    .icon-bar {
        width: 22px;
        height: 2px;
        background-color: #b6b6b6;
        display: block;
        transition: all 0.2s;
        margin-top: 4px;
    }
    .icon-bar-white {
        background-color: #fff !important;
    }

    .navbar-toggler {
        border: none;
        background: transparent !important;
    }

    .navbar-toggler .top-bar {
        transform: rotate(45deg);
        transform-origin: 10% 10%;
    }

    .navbar-toggler .middle-bar {
        opacity: 0;
    }

    .navbar-toggler .bottom-bar {
        transform: rotate(-45deg);
        transform-origin: 10% 90%;
    }

    .navbar-toggler.collapsed .top-bar {
        transform: rotate(0);
    }

    .navbar-toggler.collapsed .middle-bar {
        opacity: 1;
    }

    .navbar-toggler.collapsed .bottom-bar {
        transform: rotate(0);
    }
    a {
        color: #000;
    }
    h2 a {
        font-weight: bold;
    }
    h1 {
        font-size: 54px;
        font-weight: bold;
    }
    h1:lang(th) {
        font-size: 56px;
        font-weight: bold;
    }
    h2 {
        font-size: 42px;
        font-weight: bold;
    }
    h2:lang(th) {
        font-size: 44px;
        font-weight: bold;
    }
    h3 {
        font-size: 38px;
        font-weight: bold;
    }
    h3:lang(th) {
        font-size: 40px;
        font-weight: bold;
    }
    .title {
        font-size: 28px;
    }
    .title:lang(th) {
        font-size: 30px;
    }
    .title2 {
        font-size: 24px;
        font-weight: normal;
    }
    .title3 {
        font-size: 20px;
        font-weight: bold;
    }
    .title2:lang(th) {
        font-size: 26px;
        font-weight: 600;
    }
    .body {
        font-size: 18px;
    }
    .body:lang(th) {
        font-size: 20px;
    }
    .caption {
        font-size: 16px;
    }
    .caption:lang(th) {
        font-size: 20px;
    }
    .smallCaption {
        font-size: 14px;
    }
    .navbar {
        padding-right: 0;
    }
    .but {
        background: var(--primary);
        border-radius: 8px;
        border: none;
        color: #fff;
        width: 100px;
        height: 25px;
        font-size: 10.5pt;
        outline: none !important;
    }
    .but:hover {
        background: rgb(226 30 30 / 80%);
    }
    .hoverArrow {
        opacity: 0;
    }
    .learnMoreBtn:hover .rightArrow {
        display: none;
    }
    .learnMoreBtn:hover .hoverArrow {
        opacity: 1;
    }
    .learnMoreBtn:hover .rightArrow {
        display: none;
    }
    .learnMoreBtn:hover .hoverArrow {
        opacity: 1;
    }

    .backMenu {
        position: fixed !important;
        width: 100%;
        top: 0;
        background: #fff;
        color: #fff;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
        z-index: 99;
        border-bottom: 1px solid #fefefe;
    }
    .backMenu.sticky {
        height: 87px;
        text-align: left;
        padding-top: 0;
        background: #fff;
        box-shadow: 0 4px 15px -12px grey;
        z-index: 999;
        overflow: visible;
    }
    .nav-link {
        display: block;
        padding: 4px 1rem 3px 1rem;
        color: #000 !important;
    }
    button {
        outline: none !important;
    }
    .butsub {
        background: var(--primary);
        border-radius: 3px;
        width: 150px;
        height: 40px;
        border: none;
        color: #fff;
        font-size: 10pt;
    }
    .butsub:hover {
        background: #cc5151;
    }
    .single_add_to_cart_button {
        background: var(--primary);
        border-radius: 3px;
        width: 100%;
        height: 40px;
        border: none;
        color: #fff;
        font-size: 10pt;
    }
    .single_add_to_cart_button:hover {
        background: #cc5151;
    }
    .woocommerce form .form-row input.input-text,
    .woocommerce form .form-row textarea {
        display: block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 0.375rem 0.75rem;
        font-size: 10pt;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .gform_wrapper.gravity-theme .gfield textarea.large {
        display: block;
        width: 100%;
        height: auto !important;
        padding: 0.375rem 0.75rem;
        font-size: 10pt;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    #customer_details {
        margin: auto !important;
    }
    .cart-subtotal {
        display: none;
    }
    .woocommerce-terms-and-conditions-wrapper {
        display: none;
    }

    .wpml-ls-legacy-dropdown {
        position: relative;
        width: auto;
        font-size: 15px;
    }
    .wpml-ls-legacy-dropdown a {
        border: none;
    }
    .wpml-ls-legacy-dropdown .wpml-ls-sub-menu a {
        z-index: 1000;
        float: left;
        min-width: 100%;
        padding: 0.5rem 0 0.5rem 10px;
        margin: 0.125rem 0 0;
        font-size: 15px;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.25rem;
    }
    .wpml-ls-legacy-dropdown a.wpml-ls-item-toggle:after {
        right: 14px;
        font-size: 12px;
    }
    .wpml-ls-legacy-dropdown a:hover,
    .wpml-ls-legacy-dropdown a:focus,
    .wpml-ls-legacy-dropdown .wpml-ls-current-language:hover > a {
        background: transparent;
    }
    .wpml-ls-legacy-dropdown .wpml-ls-sub-menu {
        border-top: none;
    }

    @media (min-width: 992px) {
        .topWholeMenu {
            display: flex;
            place-content: space-between;
        }
        .customContainerWidth {
            max-width: 800px;
            padding: 0;
        }
    }
    @keyframes cssAnimation {
        to {
            opacity: 1;
            visibility: visible;
        }
    }
    /* Hamburger Menu */

    @media (max-width: 992px) {
        .backMenu.sticky {
            height: auto;
        }
        .navbar-nav .nav-item.active > a {
            border: none !important;
            /* border-bottom: #e10a17 2px solid !important; */
            border-radius: 0;
            font-weight: normal;
            /* color: #e10a17 !important; */
            /* width: 98%; */
        }
        .navbar-light .navbar-nav .nav-link {
            padding-bottom: 20px;
        }
        .navbar-nav {
            margin-top: 1rem;
        }
        .topRightMenu {
            flex-direction: column;
        }
        .langDiv {
            margin-bottom: 1rem;
            margin-left: 7px;
        }
        /* .customBtn {
      width: auto;
    } */
        .icon-bar {
            background-color: #000;
        }
    }
    @media (max-width: 768px) {
        body {
            margin-top: 0;
        }
        .backMenu {
            position: relative;
        }
        .book {
            display: flex;
            place-content: center;
        }
        .logo {
            width: 110px;
        }
        h2 {
            font-size: 24px;
        }
        .caption:lang(th) {
            font-size: 16px;
        }
        .title2:lang(th) {
            font-size: 20px;
        }
        .body:lang(th) {
            font-size: 16px;
        }
    }
    @media (max-width: 425px) {
    }

    /* End Menu */
    //   End Header
    .otgs-development-site-front-end {
        display: none;
    }
    .topRightMenu {
        margin-right: 10px;
    }
    .langBtn.TH:hover {
        color: #646464;
    }
    .backMenu {
        position: relative !important;
    }
    body {
        margin-top: 0 !important;
    }
    button:hover {
        background-color: #f7f7f8;
    }
    .backMenu {
        border-bottom: 1px solid #e3e3e3;
    }
    .langBtn {
        width: 54px;
        height: 38px;
        padding: 8px 16px;
        background: #f7f7f8 !important;
        border: none;
        color: #646464;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .langBtn:focus {
        background: #f7f7f8 !important;
        color: #646464 !important;
    }
    .langBtn.TH {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
    .langBtn.EN {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .langBtn:hover {
        color: #646464;
    }
    .langBtn.active {
        background: #646464 !important;
        color: #fff !important;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .topWholeMenu {
        position: absolute;
        right: 0;
    }
    .planSection {
        padding: 5rem 0;
    }
    .planSection h1 {
        font-size: 35px;
        text-align: center;
    }
    .planSection h2 {
        font-size: 25px;
        color: #646464;
        text-align: center;
        margin-top: 1rem;
        font-weight: 300;
    }
    .plans {
        margin-top: 5rem;
        place-content: center;
        display: flex;
        gap: 20px;
    }
    .plan {
        height: 750px;
        background: #ffffff;
        border: 1px solid #e1e1e1;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        padding: 32px;
        position: relative;
    }
    h1 {
        font-size: 35px;
    }
    h2 {
        font-size: 25px;
    }
    h3 {
        font-size: 16px;
    }
    .planMembers h3 {
        font-size: 17px;
        color: #a5a5a5;
        font-weight: bold;
    }
    .planMembers h2 {
        font-size: 26px;
        font-weight: bold;
        color: #000;
        margin-top: 0;
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 34px;
        text-align: center;

        color: #f22f46;
    }
    .choosePlanBtn {
        position: absolute;
        bottom: 20px;
        left: 25px;
        right: 25px;
    }
    .customBorderBtn {
        border: 1px solid #646464;
        color: #646464;
        width: 100%;
    }
    .premiumPlan {
        background: #feeef0;
        border: 1px solid #e1e1e1;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    }
    .planMonth {
        font-weight: 300;
        color: #f22f46;
        font-weight: 700;
        font-size: 35px;
        line-height: 55px;
        text-align: center;
        color: #f22f46;
    }
    .planMonth span {
        font-size: 12px;
        color: #000;
    }
    .plan hr {
        border-top: 1px solid #e1e1e1;
    }
    .premiumPlan hr,
    .deluxePlan hr {
        border-top: 1px solid #415f77;
    }
    .premiumPlan .planMembers h2,
    .deluxePlan .planMembers h2 {
        color: #f22f46;
    }
    .coporatePlan .planMembers h2 {
        color: #ffd880;
    }
    .premiumPlan .planMembers h3,
    .deluxePlan .planMembers h3 {
        color: #000;
    }
    .coporatePlan .planMembers h3 {
        color: #e1e1e1;
    }
    h4 {
        font-size: 12px;
    }
    .deluxePlan .planMonth {
        color: #415f77;
    }
    .deluxePlan {
        background: #d1e9ea;
        border: 1px solid #f22f46;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .recommend {
        position: absolute;
        width: 100%;
        top: -43px;
        left: -1px;
        right: 0;
    }
    .recommend button {
        border: none;
        background: #f22f46;
        border-radius: 8px 8px 0px 0px;
        color: #fff;
        width: 101%;
        height: 43px;
        cursor: default;
    }
    .deluxePlan .recommend button {
        width: 100.8%;
    }
    .deluxePlan .customBorderBtn {
        background: #f22f46;
        color: #fff;
        border: none;
    }
    .deluxePlan .customBtn {
        width: 100%;
        height: 45px;
    }
    .coporatePlan {
        background: #415f77;
    }
    .coporatePlan .planTitle {
        color: #fff;
    }
    .coporatePlan .planMonth {
        color: #ffd880;
    }
    .coporatePlan .customBorderBtn {
        background: #fff;
    }
    .coporatePlan .customBorderBtn:hover {
        background: var(--primary);
        color: #fff;
    }
    .topText {
        font-size: 35px;
        text-align: center;
    }
    .compareSection {
        padding: 1rem 0 4rem 0;
    }
    .innerColTitle {
        font-size: 20px;
        font-weight: 300;
        padding: 30px 0;
        margin-bottom: 0;
    }
    .supportColItems {
        padding: 0;
        border-top: 1px solid #a5a5a5;
        /* border-right: 1px solid #a5a5a5; */
        position: relative;
    }
    .freeCol {
        color: #a5a5a5;
        padding-left: 0;
        padding-right: 0;
        height: 100%;
    }
    .innerCompareSection {
        margin-top: 18rem;
        display: flex;
    }
    .supportCol {
        padding-right: 0;
    }
    .freeCol h2 {
        color: #000;
    }
    .tableTitle {
        position: absolute;
    }
    .supportCol .tableTitle {
        top: -45px;
    }
    .freeCol .tableTitle {
        top: -145px;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
    }
    .tableTitle .choosePlanBtn {
        position: relative;
        top: auto;
        left: auto;
        right: auto;
        bottom: auto;
        width: 80%;
        margin: auto;
    }
    .tableTitle .choosePlanBtn .customBtn {
        width: 100%;
        height: 45px;
    }
    .tableTitle h2 {
        margin: 0;
    }
    .tableTitle h3 {
        margin: 15px 0;
    }
    .freeCol .innerColTitle {
        text-align: center;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
    }
    .freeColComPare .innerColTitle {
        border-bottom: 1px solid #f22f46;
    }
    .freeColComPare .supportColItems {
        border-right: 1px solid #f22f46;
        border-left: 1px solid #f22f46;
    }
    .freeColComPare {
        background: rgba(242, 47, 70, 0.08);
    }
    .freeColComPare .tableTitle h3 {
        color: #a5a5a5;
    }
    .fixRightColor {
        border-right: 1px solid transparent;
    }
    .premiumPrice {
        color: #6cd14e;
    }
    .deluxeCol .supportColItems {
        border-top: 1px solid #f22f46;
        border-right: 1px solid #f22f46;
        border-left: 1px solid #f22f46;
    }
    .deluxeCol {
        border-bottom: 1px solid #f22f46;
    }
    .premiumCol .supportColItems {
        border-right: 1px solid transparent;
    }
    .lastCol .supportColItems {
        border-right: 1px solid #a5a5a5;
    }
    .recommendCol {
        border: 1px solid #f22f46;
        height: 166px;
        position: absolute;
        width: 100.4%;
        top: -165px;
        left: -1px;
    }
    .compareSection .recommendCol {
        width: 100%;
        left: 0;
    }
    .recommendCol .recommend button {
        height: 46px;
        width: 101%;
    }
    .deluxeCol {
        background: rgba(242, 47, 70, 0.08);
    }
    .companies {
        display: flex;
        place-content: center;
        background: #f6f6f6;
        padding: 4rem 0;
    }
    .companies img {
        width: 100px;
    }
    .wholeLogos {
        display: flex;
        place-content: center;
    }
    .leftLogos {
        display: flex;
    }
    .rightLogos {
        display: flex;
    }
    .companyLogo {
        padding: 10px;
    }
    .coporatePlan h4 {
        color: #f7f7f8;
    }
    .modal-content {
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 30px;
        position: relative;
        width: 100%;
    }
    .modal-dialog {
        max-width: 900px;
        text-align: center;
    }
    .modal-body h1 {
        font-size: 35px;
        font-weight: bold;
        color: #000;
    }
    .modal-body h2 {
        font-size: 25px;
        font-weight: 300;
        color: #a5a5a5;
        line-height: 39px;
    }
    .modal-body img {
        margin-top: 2rem;
        width: 400px;
    }
    .modal-body .customBtn {
        margin: 2rem auto auto auto;
        background: #0263e0;
    }
    .modal-body .customBtn span {
        position: relative;
        transition: all 0.6s;
        left: 5px;
    }
    .modal-body .customBtn:hover {
        background: #025acc;
        box-shadow: 0px 4px 12px rgba(2, 99, 224, 0.5);
        border-radius: 4px;
    }
    .modal-body .customBtn:hover span {
        left: -5px;
    }
    .modal-body .customBtn svg {
        position: relative;
        transition: all 0.6s;
        opacity: 0;
        right: 0;
    }
    .modal-body .customBtn:hover svg {
        opacity: 1;
        right: -5px;
    }
    .secondBody img {
        width: 620px;
    }
    h1:lang(th) {
        font-size: 35px;
        font-weight: bold;
    }
    h2:lang(th) {
        font-size: 25px;
        font-weight: 500;
    }
    h3:lang(th) {
        font-size: 16px;
        font-weight: bold;
    }
    .innerColTitle:lang(th) {
        font-size: 20px;
        font-weight: 300;
    }
    .fixTHVersionPaddingColumn {
        display: none;
    }
    .fixTHVersionPaddingColumn:lang(th) {
        display: block;
    }
    .freePlan {
        background: #f7f7f8;
        border: 1px solid #f22f46;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .freePlan .customBtn {
        width: 100%;
        height: 45px;
    }
    .tableTitle .choosePlanBtn .customBtn {
        padding: 1px 6px;
    }
    .freePlan h2 {
        color: #f22f46;
    }
    .freeCol .supportColItems {
        border-top: 1px solid #f22f46;
    }

    @media (max-width: 1200px) and (min-width: 992px) {
        .planMonth {
            font-size: 23px !important;
        }
    }

    @media (min-width: 1200px) {
        .container,
        .container-lg,
        .container-md,
        .container-sm,
        .container-xl {
            max-width: 1300px;
        }
    }
    @media (min-width: 992px) {
        .col-lg-3 {
            -ms-flex: 0 0 24%;
            flex: 0 0 24%;
            max-width: 24%;
        }
    }

    @media (max-width: 992px) {
        .swiperSection {
            margin-bottom: 5rem;
            padding-left: 3rem;
        }
        .mobileSection {
            padding: 0;
        }
        .modal-body img {
            width: 100%;
        }
        .wholeLogos {
            flex-direction: column;
        }
        .companies img {
            width: 64px;
        }
        .leftLogos {
            place-content: center;
        }
        .rightLogos {
            place-content: center;
        }
        h1 {
            font-size: 26px;
        }
        .planMembers h3 {
            font-size: 14px;
            color: #000;
        }
        .planMembers h2 {
            font-size: 20px;
        }
        .plan {
            height: 660px;
            margin-top: 45px;
        }
        .customBorderBtn {
            border-radius: 4px;
        }
        .deluxeCol {
            .choosePlanBtn {
                button {
                    background: ${theme.colors.main};
                    color: #fff;
                    border: 1px solid ${theme.colors.main};
                    :hover {
                        background: #cd2337;
                        color: #fff;
                        border: 1px solid #cd2337;
                    }
                }
            }
        }
        .freePlanCol {
            .customBorderBtn {
                background: ${theme.colors.main};
                color: #fff;
                border: 1px solid ${theme.colors.main};
                :hover {
                    background: #cd2337;
                    color: #fff;
                    border: 1px solid #cd2337;
                }
            }
        }
        .plan-free {
            background: #f7f7f8;
            border: 1px solid #f22f46;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            .customBorderBtn {
                background: ${theme.colors.main};
                color: #fff;
                border: 1px solid ${theme.colors.main};
                :hover {
                    background: #cd2337;
                    color: #fff;
                    border: 1px solid #cd2337;
                }
            }
        }
        .deluxePlan {
            .customBtn {
                :hover {
                    background: #cd2337;
                    color: #fff;
                    border: 1px solid #cd2337;
                }
            }
        }
        .premiumPlan {
            .customBorderBtn {
                :hover {
                    background: #f7f7f8;
                    /* color: #fff; */
                    /* border: 1px solid #646464; */
                }
            }
        }
        .coporatePlan {
            .customBorderBtn {
                :hover {
                    background: #f7f7f8;
                    color: #646464;
                }
            }
        }
        .deluxeCol {
            .customBtn {
                :hover {
                    background: #cd2337;
                    color: #fff;
                    border: 1px solid #cd2337;
                }
            }
        }
    }
    @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
        .plan-free {
            padding: 0;
            border-radius: 8px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            .mobile-popular {
                position: absolute;
                width: 100.6%;
                top: -44px;
                left: -1px;
                button {
                    border: none;
                    background: #f22f46;
                    border-radius: 8px 8px 0px 0px;
                    color: #fff;
                    width: 100%;
                    height: 43px;
                    cursor: default;
                    font-weight: bold;
                }
            }
            hr {
                border-top: 1px solid #415f77;
            }

            .card-body {
                padding: 32px;
            }
        }
        .item-body {
            padding: 32px 16px;
            margin: 0 16px;
        }
        .planTitle {
            font-style: normal;
            font-weight: 700;
            font-size: 26px;
            line-height: 35px;
            text-align: center;
        }
        .planMembers {
            h3 {
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                color: #000000;
            }
            h2 {
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 27px;
                text-align: center;
                color: #f22f46;
            }
        }
        .planMonth {
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 27px;
            text-align: center;
            color: #f22f46;
        }
        .premiumPlan {
            margin-top: 43px;
        }
        .premiumPlan {
            .choosePlanBtn {
                button {
                    background: #ffffff;
                }
            }
        }
        .deluxePlan {
            padding: 0;
            border-radius: 8px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            .mobile-recommend {
                position: absolute;
                width: 100.6%;
                top: -44px;
                left: -1px;
                button {
                    border: none;
                    background: #f22f46;
                    border-radius: 8px 8px 0px 0px;
                    color: #fff;
                    width: 100%;
                    height: 43px;
                    cursor: default;
                    font-weight: bold;
                }
            }
            .customBtn {
                background: ${theme.colors.main};
                color: #fff;
                border: 1px solid ${theme.colors.main};
                :hover {
                    background: #cd2337;
                    color: #fff;
                    border: 1px solid #cd2337;
                }
            }
        }

        .coporatePlan {
            margin-top: 43px;
            border-radius: 8px;
        }
        .planSection {
            padding: 32px 0;
            h1 {
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 27px;
                text-align: center;
                color: #000000;
            }
            h2 {
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #646464;
            }
        }
        .companies {
            h2 {
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 27px;
                color: #000000;
            }
        }
        .topRightMenu {
            .langBtn {
                height: 32px;
                padding: 0;
            }
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            a {
                margin: 0 !important;
                img {
                    height: 40px;
                    width: auto;
                }
            }
            .topRightMenu {
                display: flex;
                flex-direction: row;
                margin-right: 0;
                .langBtn {
                    padding: 8px 12px;
                    align-items: center;
                    display: flex;
                    justify-content: center;
                }
            }
        }
    }
    .popular {
        position: absolute;
        width: 100%;
        top: -44px;
        left: -1px;
        right: 0;
    }
    .popular {
        button {
            border: none;
            background: #f22f46;
            border-radius: 8px 8px 0px 0px;
            color: #fff;
            width: 100.7%;
            height: 43px;
            cursor: default;
        }
    }
    .plan-free {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        .customBorderBtn {
            background: ${theme.colors.main};
            color: #fff;
            border: 1px solid ${theme.colors.main};
            :hover {
                background: #cd2337;
                color: #fff;
                border: 1px solid #cd2337;
            }
        }
    }
    .deluxePlan {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        .customBtn {
            background: ${theme.colors.main};
            color: #fff;
            border: 1px solid ${theme.colors.main};
            :hover {
                background: #cd2337;
                color: #fff;
                border: 1px solid #cd2337;
            }
        }
    }
    .coporatePlan {
        .customBorderBtn {
            :hover {
                background: #f7f7f8;
                color: #646464;
            }
        }
    }
    .premiumPlan {
        .customBorderBtn {
            :hover {
                background: #f7f7f8;
                color: #646464;
            }
        }
    }
    .freePlanColTop {
        border: 1px solid #f22f46;
        height: 166px;
        position: absolute;
        width: 100.4%;
        top: -165px;
        left: 0px;
    }
    .freePlanCol {
        .supportColItems {
            border: 1px solid #f22f46;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .choosePlanBtn {
            .customBorderBtn {
                background: ${theme.colors.main};
                color: #fff;
                border: 1px solid ${theme.colors.main};
                :hover {
                    background: #cd2337;
                    color: #fff;
                    border: 1px solid #cd2337;
                }
            }
        }
    }
    .premiumCol {
        .choosePlanBtn {
            .customBorderBtn {
                :hover {
                    background: #f7f7f8;
                    color: #646464;
                }
            }
        }
    }
    .deluxeCol {
        .supportColItems {
            /* border: 1px solid #f22f46; */
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .choosePlanBtn {
            .customBtn {
                background: ${theme.colors.main};
                color: #fff;
                border: 1px solid ${theme.colors.main};
                :hover {
                    background: #cd2337;
                    color: #fff;
                    border: 1px solid #cd2337;
                }
            }
        }
    }
`;
