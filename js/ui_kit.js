//slider

const mainSlideBlock = "slider_sect";
const mainSlidersBlock = "slider_switch";
const slidersBlock = "sw_pn";
const slideContentBlock = "slider_content";
const sliderClass = "sl_sw_cmn";
const activeSlide = "slide_active";
const hidenSlide = "slide_hide";
const notActiveSwithcer = "slide_switcher";
const activeSwithcer = "slide_switcher_active";
const arrowLeft = "ar_left";
const arrowRight = "ar_right";


checkSliderPosition();
function checkSliderPosition() {
    document.querySelectorAll("." + activeSwithcer).forEach(slider => {
        slider.className = notActiveSwithcer + " " + sliderClass;
    });
    document.querySelectorAll("." + mainSlideBlock).forEach(slider => {
        let slider_id = slider.getAttribute("data-slider-id");
        let slide_count = check_cr_slide(slider);
        let get_slide_swither = document.querySelector("div[data-for-slider='" + slider_id + "']");
        get_slide_swither.querySelector("." + slidersBlock);
        get_slide_swither.querySelectorAll("." + notActiveSwithcer)[slide_count].className = activeSwithcer + " " + sliderClass;

    });
}
document.querySelectorAll("." + mainSlidersBlock).forEach(sliderS => {
    let slider_id = sliderS.getAttribute("data-for-slider");
    let pr_btn = sliderS.querySelector("." + arrowLeft);
    let nx_btn = sliderS.querySelector("." + arrowRight);
    let get_slider = document.querySelector("div[data-slider-id='" + slider_id + "']");
    pr_btn.onclick = function e() {
        let pr_slide = check_cr_slide(get_slider) - 1;
        if (pr_slide < 0) {
            pr_slide = get_slider.querySelectorAll("." + slideContentBlock).length - 1;
        }
        change_Slide(get_slider, pr_slide);
    }
    nx_btn.onclick = function e() {
        let next_slide = check_cr_slide(get_slider) + 1;
        if (next_slide > get_slider.querySelectorAll("." + slideContentBlock).length - 1) {
            next_slide = 0;
        }
        change_Slide(get_slider, next_slide);
    }
    let switch_to = 0;
    sliderS.querySelectorAll("." + sliderClass).forEach(sliderSwitcher => {
        sliderSwitcher.setAttribute("switch-to", switch_to);
        sliderSwitcher.onclick = function e() {
            change_Slide(get_slider, sliderSwitcher.getAttribute("switch-to"));
        }
        switch_to += 1;
    });
});
function change_Slide(slider, slide) {
    let slide_hide = slider.querySelector("." + activeSlide);
    let slide_show = slider.querySelectorAll("." + slideContentBlock)[slide];
    const hide_anim = [
        { opacity: "1" },
        { opacity: "0" },
    ];
    const show_anim = [
        { opacity: "0" },
        { opacity: "1" },
    ];
    const anim_t = 200;
    slide_hide.animate(hide_anim, anim_t);
    setTimeout(function e() {
        slide_hide.classList.remove(activeSlide);
        slide_hide.classList.add(hidenSlide);
        slide_show.classList.remove(hidenSlide);
        slide_show.classList.add(activeSlide);
        slide_show.animate(show_anim, anim_t);
        checkSliderPosition();
    }, 200);
}
function check_cr_slide(slider) {
    let slide_count = 0;
    let stop = false;
    slider.querySelectorAll("." + slideContentBlock).forEach(slide => {
        if (!(slide.classList.contains(activeSlide)) && !stop) {
            slide_count += 1;
        } else {
            stop = true;
        }
    });
    return slide_count;
}
// tabs
document.querySelectorAll(".sc2_center").forEach(tab => {
    tab.querySelectorAll(".tabs_btn").forEach(tab_btn => {
        const hide_anim = [
            { opacity: "1" },
            { opacity: "0" },
        ];
        const show_anim = [
            { opacity: "0" },
            { opacity: "1" },
        ];
        const anim_t = 200;
        tab_btn.onclick = function e() {
            tab.querySelectorAll(".tabs_btn").forEach(tab_btn2 => {
                tab_btn2.className = "category tabs_btn";
            });
            tab_btn.className = "ct_active tabs_btn";
            tab.querySelectorAll(".sec_tab_content").forEach(tab_p => {

                tab_p.animate(hide_anim, anim_t);
                setTimeout(function e() {
                    tab_p.className = "sec_tab_content tab_hide";
                }, 200);
            });
            setTimeout(function e() {
                tab.querySelectorAll(".sec_tab_content")[Number(tab_btn.getAttribute("data-slide")) - 1].animate(show_anim, anim_t);
                tab.querySelectorAll(".sec_tab_content")[Number(tab_btn.getAttribute("data-slide")) - 1].className = "sec_tab_content";
            }, 200);

        }
    });
});

// category

document.querySelectorAll(".sc3_left").forEach(tab => {
    tab.querySelectorAll(".tabs_btn").forEach(tab_btn => {
        tab_btn.onclick = function e() {
            tab.querySelectorAll(".tabs_btn").forEach(tab_btn2 => {
                tab_btn2.className = "category tabs_btn";
            });
            tab_btn.className = "ct_active tabs_btn";
            tab.querySelectorAll(".ctg_block").forEach(tab_p => {
                if (tab_p.getAttribute("data-to-ct") == tab_btn.getAttribute("data-ct") || tab_btn.getAttribute("data-ct") == 1) {
                    tab_p.className = "ctg_block";
                    const hide_anim = [
                        { opacity: "1" },
                        { opacity: "0" },
                    ];
                    const show_anim = [
                        { opacity: "0" },
                        { opacity: "1" },
                    ];
                    const anim_t = 200;
                    tab_p.animate(show_anim, anim_t);
                } else {
                    tab_p.className = "ctg_block tab_hide";
                    const hide_anim = [
                        { opacity: "1" },
                        { opacity: "0" },
                    ];
                    const show_anim = [
                        { opacity: "0" },
                        { opacity: "1" },
                    ];
                    const anim_t = 200;
                    tab_p.animate(hide_anim, anim_t);
                }
            });

        }
    });
});

//modal

document.querySelectorAll(".to_card").forEach(btn => {
    let slider = document.querySelector(".slider_sect");
    btn.onclick = function e() {
        let cr_slide = check_cr_slide(slider);
        let slide = slider.querySelectorAll(".slc_panel")[cr_slide];
        let slide_title = slide.querySelector(".slc_title").innerHTML;
        let modal = document.querySelector(".modal_w");
        if (modal.classList.contains("modal_closed")) {
            document.querySelector(".modal_title").innerHTML = slide_title;
            modal.className = "modal modal_w";
        } else {
            modal.className = "modal_closed modal_w";
        }
    }
});

document.querySelector(".modal_close").onclick = function e() {
    document.querySelector(".modal_w").className = "modal_closed modal_w";
}

document.querySelectorAll(".ac_block").forEach(accordion => {
    accordion.onclick = function e() {
        let ac_ad = accordion.querySelector(".ac_add");
            ac_ad.classList.toggle('ac_hide')
    }

});

document.querySelector(".header_icon3").onclick = function e() {
    document.querySelector(".links_box").classList.toggle("links_box_show");
}