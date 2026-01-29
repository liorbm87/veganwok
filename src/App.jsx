import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Edit2, Trash2, Eye, EyeOff, Plus, Minus, ArrowLeft, 
  MessageCircle, AlertCircle, Share2, Search, RotateCcw, 
  X, LayoutDashboard, MousePointer2, ArrowDown, ShoppingBasket, BellRing, MapPin, Menu,
  Instagram, Facebook, ArrowUp, Save, Settings, PackageX, Lock, Zap, Clock, Flame,
  Cookie, Snowflake, Navigation, ArrowRight, Database, LayoutGrid, List, Trophy, Gift, Leaf, Award, GripVertical, PlusCircle, Printer, Type, ShoppingCart, Copy, Info, BarChart3, Users, Calendar, KeyRound, Camera, User, ExternalLink, Layers, ShoppingBag, PartyPopper, Wand2, Ticket, RefreshCw, BookOpen
} from 'lucide-react';

const SUPABASE_URL = 'https://gmeplxcpzparmhszuwcl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yk-zMdlVuFuJdM8XiUMDnQ_B9XzHZtj';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const WHATSAPP_NUMBER = "972547741436";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/FQPk9GkRx0s6jKJXQzU0hT";
const INSTAGRAM_URL = "https://www.instagram.com/liorbenmoshe.veganpatisserie?igsh=MTg0b2NpNG56dncycQ==";
const FACEBOOK_URL = "https://www.facebook.com/LiorBenMoshe";

export default function LiorPastryApp() {
  const daysOfWeek = [
    { label: 'ראשון', value: 0 },
    { label: 'שני', value: 1 },
    { label: 'שלישי', value: 2 },
    { label: 'רביעי', value: 3 },
    { label: 'חמישי', value: 4 },
    { label: 'שישי', value: 5 },
    { label: 'שבת', value: 6 }
  ];

  const [isAdmin, setIsAdmin] = useState(false);
    const [cartBeforeRandom, setCartBeforeRandom] = useState({});
const [onlineUsers, setOnlineUsers] = useState(1);


// --- המונה המעודכן בזמן אמת ---
useEffect(() => {
  // יוצרים מזהה ייחודי זמני לגולש הנוכחי כדי שייחשב כיישות נפרדת
  const userKey = 'user_' + Math.random().toString(36).substring(2, 11);

  const channel = supabase.channel('online-users', {
    config: { 
      presence: { key: userKey } // כאן השינוי הקריטי - מפתח ייחודי לכל גולש
    }
  });

  const updateCount = () => {
    const state = channel.presenceState();
    // עכשיו כל מפתח באובייקט מייצג גולש ייחודי
    const count = Object.keys(state).length;
    setOnlineUsers(count > 0 ? count : 1);
  };

  channel
    .on('presence', { event: 'sync' }, updateCount)
    .on('presence', { event: 'join' }, updateCount)
    .on('presence', { event: 'leave' }, updateCount)
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        console.log("Connected to Realtime! 🟢");
        // מעבירים מידע נוסף אם רוצים (אופציונלי)
        await channel.track({ 
          online_at: new Date().toISOString() 
        });
      }
      if (status === 'CHANNEL_ERROR') {
        console.error("Realtime connection failed! 🔴");
      }
    });

  return () => {
    channel.unsubscribe();
  };
}, []);
// --- סוף המונה המעודכן ---

    const [lastRandomBudget, setLastRandomBudget] = useState(null);
  const [tempVariants, setTempVariants] = useState([]); // ניהול רשימת הסוגים בחלונית העריכה
  const [settingsSnapshot, setSettingsSnapshot] = useState(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
    const [hasShownCompassion, setHasShownCompassion] = useState(false);
const [showProductSalesModal, setShowProductSalesModal] = useState(false);
const [showVisitsModal, setShowVisitsModal] = useState(false);
  const [activeExtraTab, setActiveExtraTab] = useState(null); // לשליטה ב-7 הכפתורים בעריכה אישית
  const [activeAdminCatModal, setActiveAdminCatModal] = useState(null); // לפתיחת מוצרים לפי קטגוריה
  const [activeSettingsTab, setActiveSettingsTab] = useState(null); // לניהול 3 הכפתורים בהגדרות אתר
const [showThresholdGiftModal, setShowThresholdGiftModal] = useState(false);
const [selectedGiftItem, setSelectedGiftItem] = useState(null);
const [showGiftSelectorInAdmin, setShowGiftSelectorInAdmin] = useState(false); // לניהול בחירת המוצרים בניהול
const [saveConfirmPass, setSaveConfirmPass] = useState("");
const [showAboutStatsModal, setShowAboutStatsModal] = useState(false);
const WhatsAppLogo = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 448 512" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-93.7-25.7l-6.7-4-69.6 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.6 9.2 31.7 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

    const [showPastryWarning, setShowPastryWarning] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showExtraSettingsModal, setShowExtraSettingsModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showVisitorDetails, setShowVisitorDetails] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [sourceTimeframe, setSourceTimeframe] = useState('today');
  const [isVeganStatsDismissed, setIsVeganStatsDismissed] = useState(false);
const [recipeSortMode, setRecipeSortMode] = useState('total'); // 'total', 'direct', 'internal'

  const [visitData, setVisitData] = useState([]);
    const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    const secondTimer = setInterval(() => setNowTime(new Date()), 1000);
    return () => clearInterval(secondTimer);
  }, []);

  const [sunDismissed, setSunDismissed] = useState(false);
  const [reminderCount, setReminderCount] = useState(0);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
    const [customerName, setCustomerName] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('lior_customer_name') || "" : "");
const [loginPass, setLoginPass] = useState("");
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showCartSummaryModal, setShowCartSummaryModal] = useState(false);
   const [previewImage, setPreviewImage] = useState(null); // עבור הגדלת תמונה
    const [bannerDismissed, setBannerDismissed] = useState(false);
    const [urgentDismissed, setUrgentDismissed] = useState(false);
    const [urgentShowCount, setUrgentShowCount] = useState(0); // מונה הופעות
    const [isUrgentActive, setIsUrgentActive] = useState(false); // שולט באנימציית הבאנר
const [fomoDismissed, setFomoDismissed] = useState(false);
    const [lastOrderShownId, setLastOrderShownId] = useState(() => localStorage.getItem('lior_last_order_id'));
  const [lastFomoString, setLastFomoString] = useState(() => localStorage.getItem('lior_last_fomo_str') || "");
  const [lastEvent, setLastEvent] = useState(() => localStorage.getItem('lior_last_event'));
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passForm, setPassForm] = useState({ old: "", new: "" });
  const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [copyNotification, setCopyNotification] = useState(null); // הודעה מעוצבת להעתקה
      const [isSharing, setIsSharing] = useState(false); // מצב טעינה בזמן שיתוף
  const [viewMode, setViewMode] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('lior_view_mode') || 'gallery' : 'gallery');

  const toggleViewMode = () => {
    const newMode = viewMode === 'gallery' ? 'list' : 'gallery';
    setViewMode(newMode);
    localStorage.setItem('lior_view_mode', newMode);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [moveProductsTo, setMoveProductsTo] = useState("");
const [showAboutModal, setShowAboutModal] = useState(false);

// תיעוד סטטיסטיקה של "מי אני"
const logAboutView = async (type) => {
  if (isAdmin || localStorage.getItem('lior_admin_device') === 'true') return;
  await supabase.from('site_events').insert([{ 
    event_name: 'about_view',
    metadata: { view_type: type } 
  }]);
};

// בדיקת קישור ישיר (למשל שיתוף מהסטורי)
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('view') === 'about') {
    setShowAboutModal(true);
    logAboutView('direct_link');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  if (params.get('view') === 'thanks') {
    setShowThankYouModal(true);
  }
}, []);

  const [loading, setLoading] = useState(true);
  const [fadeLoading, setFadeLoading] = useState(false); 
  const [editingProduct, setEditingProduct] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = typeof window !== 'undefined' ? localStorage.getItem('lior_active_cart') : null;
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [showDayWarning, setShowDayWarning] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [pulse, setPulse] = useState(false); 
  const [isWobbling, setIsWobbling] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [filterGF, setFilterGF] = useState(false);
  const [activeTip, setActiveTip] = useState(null); 
  const [categoryTip, setCategoryTip] = useState(null); 
  const [showBoxAlert, setShowBoxAlert] = useState(false); 
  const [logoClicks, setLogoClicks] = useState(0);
const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedVariantProduct, setSelectedVariantProduct] = useState(null);
  const [variantSelections, setVariantSelections] = useState({});
  const [orderOptions, setOrderOptions] = useState([]);
  const [selectedOrderOption, setSelectedOrderOption] = useState(null);
  const [showOrderOptionManager, setShowOrderOptionManager] = useState(false);

  // --- New States for Requested Features ---
  const [showGoldenModal, setShowGoldenModal] = useState(false);
  const [goldenWinnerItem, setGoldenWinnerItem] = useState(null);
  const [socialProof, setSocialProof] = useState(null);
  const [showRandomizerModal, setShowRandomizerModal] = useState(false);
  const [budget, setBudget] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(""); // This is now manually typed by customer

  const [isDiscountActive, setIsDiscountActive] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lior_discount_active') === 'true';
    }
    return false;
  });

  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showAlreadyActiveModal, setShowAlreadyActiveModal] = useState(false);
    const [pendingWhatsappLink, setPendingWhatsappLink] = useState(""); // קישור ממתין לזוכים

  const [showCompassion, setShowCompassion] = useState(false); 
  const [showNavModal, setShowNavModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
const [showSaleStockModal, setShowSaleStockModal] = useState(false);
    // --- Recipes & Recipe Categories State ---
  const [recipes, setRecipes] = useState([]);
    const [recipeRanks, setRecipeRanks] = useState({}); 
  const [showRecipeStatsModal, setShowRecipeStatsModal] = useState(false);
  const [recipeStatsData, setRecipeStatsData] = useState([]);

  const logRecipeView = async (recipe, type) => {
    // שים לב: אם אתה בודק את זה מהמכשיר שלך והוא מזוהה כ"מנהל", זה לא יירשם.
    // לניסוי: תוכל למחוק זמנית את התנאי isAdmin למטה כדי לראות שזה עובד.
    if (isAdmin || (typeof window !== 'undefined' && localStorage.getItem('lior_admin_device') === 'true')) return;

    await supabase.from('site_events').insert([{ 
      event_name: 'recipe_view',
      metadata: { 
        recipe_id: recipe.id, 
        recipe_title: recipe.title, 
        view_type: type 
      }
    }]);
    
    // מעדכן את המדליות באתר מיד אחרי הלחיצה
    fetchRecipeRanks();
  };


  // פונקציה לחישוב מדליות (לפי לחיצות באתר בלבד)
  const fetchRecipeRanks = async () => {
    const { data, error } = await supabase
      .from('site_events')
      .select('metadata')
      .eq('event_name', 'recipe_view');
    
    if (error || !data) return;

    const counts = {};
    data.forEach(event => {
      // סופר אך ורק לחיצות פנימיות באתר (internal_click)
      if (event.metadata && event.metadata.view_type === 'internal_click') {
        const id = event.metadata.recipe_id;
        if (id) counts[id] = (counts[id] || 0) + 1;
      }
    });

    // מיון לפי כמות לחיצות ויצירת אובייקט דירוג
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const ranks = {};
    if (sorted[0] && sorted[0][1] > 0) ranks[sorted[0][0]] = 1; // זהב
    if (sorted[1] && sorted[1][1] > 0) ranks[sorted[1][0]] = 2; // כסף
    if (sorted[2] && sorted[2][1] > 0) ranks[sorted[2][0]] = 3; // ארד
    
    console.log("דירוג מתכונים מעודכן:", ranks); // לבדיקה בקונסול
    setRecipeRanks(ranks);
  };


  const [recipeCats, setRecipeCats] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [activeRecipeCat, setActiveRecipeCat] = useState("all");
  
  const [showRecipesModal, setShowRecipesModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const [showRecipeManager, setShowRecipeManager] = useState(false);
  const [showRecipeFormModal, setShowRecipeFormModal] = useState(false);
  const [showRecipeCatManager, setShowRecipeCatManager] = useState(false);
    const [showPendingOrdersModal, setShowPendingOrdersModal] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [selectedPendingOrder, setSelectedPendingOrder] = useState(null);
const [dismissedOrderId, setDismissedOrderId] = useState(null);

  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingRecipeCat, setEditingRecipeCat] = useState(null);
  const [draggedRecipeIndex, setDraggedRecipeIndex] = useState(null);
  const [draggedRecipeCatIndex, setDraggedRecipeCatIndex] = useState(null);
  const [formCategory, setFormCategory] = useState('pastries');
const [aboutStats, setAboutStats] = useState({ direct_link: 0, internal_click: 0 });

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [draggedCatIndex, setDraggedCatIndex] = useState(null); // למשיכת קטגוריות
  const boxTimeoutRef = useRef(null);
  const compassionTimeoutRef = useRef(null);
  const wobbleTimerRef = useRef(null);

  const [siteSettings, setSiteSettings] = useState({
    id: 1,   
seo_description: "המאפים של ליאור בן משה - קונדיטוריה טבעונית ופטיסרי ברמה גבוהה. קראנץ' שמרים, עוגות וקינוחים בעבודת יד. הזמינו מראש לאיסוף מהיריד הטבעוני.",
seo_keywords: "ליאור בן משה, קונדיטוריה טבעונית, פטיסרי טבעוני, עוגות שמרים טבעוניות, מאפים טבעוניים, יריד טבעוני דיזנגוף סנטר, טבעונות",
seo_title: "ליאור בן משה - קונדיטוריה טבעונית",
whatsapp_recipient_name: "ליאור",
reminder_brand_name: "ליאור בן משה", // ערך ברירת מחדל
payment_details: "0547741436",
whatsapp_group_url: "https://chat.whatsapp.com/FQPk9GkRx0s6jKJXQzU0hT",
    main_title: "היריד הטבעוני בדיזנגוף סנטר",
    sub_title: "יום רביעי | 12:00 - 20:30",
    site_status: "open",
    address: "דיזנגוף 50, תל אביב",
    fair_days: [3],
    opening_hour: "12:00",
    closing_hour: "20:30",
    password: "3013",
    reward_type: "12_percent",
    golden_pastry_active: false,
    golden_pastry_counter: 0,
    golden_pastry_target: 50,
    coupon_active: false,
    coupon_code: "",
    coupon_discount_percent: 10,
    urgent_message: "",
    whatsapp_number: "972547741436",
    logo_url: "https://i.postimg.cc/FRQ5cTVN/1000099532-removebg-preview.png",
    instagram_url: "https://www.instagram.com/liorbenmoshe.veganpatisserie",
    facebook_url: "https://www.facebook.com/LiorBenMoshe",
    extra_button_active: true,
    extra_button_text: "להזמנות ב-Mypips",
    extra_button_url: "https://mypips.app/trufflevegan",
    extra_button_logo: "https://i.postimg.cc/KvqqQzzX/IMG-20260107-WA0030.jpg",
    sale_active: false,
    sale_end_time: "20:30",
    sale_discount_percent: 20,
sale_categories: [],
whatsapp_closing_hour: "20:30",
whatsapp_opening_hour: "12:00",
fomo_social_active: true,
    story_image_url: "",
    instagram_username: "",
threshold_promo_active: false,
threshold_promo_limit: 250,
threshold_promo_items: [],
    popup_active: false,
    popup_text: "",
    popup_image_url: ""
  });
  
  // --- משתנים חדשים עבור פונקציות המתכונים ---
  const [isScreenAwake, setIsScreenAwake] = useState(false);
  const wakeLockRef = useRef(null);
  const [isMarkingSteps, setIsMarkingSteps] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState({});

  // פונקציית השארת מסך דולק
  const toggleWakeLock = async () => {
    if (!isScreenAwake) {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
          setIsScreenAwake(true);
          // אם המכשיר מתנתק מהנעילה בגלל מעבר טאב למשל
          wakeLockRef.current.addEventListener('release', () => {
            setIsScreenAwake(false);
          });
        }
      } catch (err) { console.error(`Wake Lock Error: ${err.name}, ${err.message}`); }
    } else {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      setIsScreenAwake(false);
    }
  };
  
  // איפוס אוטומטי כשיוצאים ממתכון או מחליפים מתכון
  useEffect(() => {
    if (!selectedRecipe) {
      setIsMarkingSteps(false);
      setCheckedSteps({});
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      setIsScreenAwake(false);
    }
  }, [selectedRecipe]);

const [showWelcomePopup, setShowWelcomePopup] = useState(false);
const [showInactivityPopup, setShowInactivityPopup] = useState(false);
const [hasShownInactivityThisSession, setHasShownInactivityThisSession] = useState(false);

// פונקציית עזר לבדיקה אם היריד פעיל (מחוץ לאפקטים)
// פונקציית עזר לבדיקה אם היריד פעיל (לוודא שהיא מחוץ לאפקט)
const isWithinOrderWindow = () => {
  if (!siteSettings || !siteSettings.fair_days) return false;
  const now = new Date();
  const fairDays = siteSettings.fair_days;
  if (fairDays.length === 0) return false;

  const firstDay = Math.min(...fairDays);
  const lastDay = Math.max(...fairDays);
  const [openH, openM] = (siteSettings.opening_hour || "12:00").split(':').map(Number);
  const [closeH, closeM] = (siteSettings.closing_hour || "20:30").split(':').map(Number);

  const startDate = new Date(now);
  startDate.setDate(now.getDate() - (now.getDay() - firstDay));
  startDate.setHours(openH, openM, 0, 0);

  const endDate = new Date(now);
  endDate.setDate(now.getDate() + (lastDay - now.getDay()));
  endDate.setHours(closeH, closeM, 0, 0);

  return now >= startDate && now <= endDate;
};

// האפקט המאוחד לטיפול בקפיצת ההודעה
useEffect(() => {
  // 1. תנאי עצירה: לא קופץ אם הסל ריק, אם אתה מנהל, או אם חלונית הוולקאם פתוחה
  if (Object.keys(cart).length === 0 || isAdmin || showWelcomePopup) return;

  // 2. קביעת הזמן: 
  // אם עוד לא הראינו את ההודעה בסשן הזה - נחכה 5 שניות (מצב רענון)
  // אם כבר הראינו/סגרנו והמשתמש המשיך - נחכה 5 דקות של חוסר פעילות
  const delay = hasShownInactivityThisSession ? (5 * 60 * 1000) : 5000;

  const timer = setTimeout(() => {
    if (isWithinOrderWindow()) {
      setShowInactivityPopup(true);
      setHasShownInactivityThisSession(true);
    }
  }, delay);

  return () => clearTimeout(timer);
  
  // האפקט יתאפס בכל פעם שהסל משתנה או כשהגדרות האתר נטענות
}, [cart, isAdmin, showWelcomePopup, hasShownInactivityThisSession, siteSettings]);

// בחירה אוטומטית של אפשרות הזמנה אם יש רק אחת כזו
useEffect(() => {
  if (showPickupModal && orderOptions.length === 1 && !selectedOrderOption) {
    setSelectedOrderOption(orderOptions[0]);
  }
}, [showPickupModal, orderOptions, selectedOrderOption]);

  // SEO Dynamic Update
useEffect(() => {
  document.title = siteSettings.seo_title || "קונדיטוריה טבעונית";

  const setMeta = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      if (name.includes('og:')) element.setAttribute('property', name);
      else element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMeta("description", siteSettings.seo_description);
  setMeta("keywords", siteSettings.seo_keywords);
  setMeta("og:title", siteSettings.seo_title);
  setMeta("og:image", siteSettings.logo_url); // משתמש בלוגו שהגדרת
}, [siteSettings]); // חשוב להוסיף את siteSettings כתלות

  useEffect(() => {
const fetchNotification = async () => {
  // 1. בדיקת הודעה דחופה - מוצגת בדיוק פעמיים בכל רענון דף
  if (siteSettings.urgent_message && siteSettings.urgent_message.trim() !== "" && 
      !urgentDismissed && urgentShowCount < 2 && !isUrgentActive) {
    
    setSocialProof({ customer_name: "עדכון", main_item: siteSettings.urgent_message, isUrgent: true });
    setIsUrgentActive(true); // מוריד את השמש/ירח
    setUrgentShowCount(prev => prev + 1); // מעלה את המונה

    // העלמה אוטומטית אחרי 4 שניות בדיוק
    setTimeout(() => {
      setSocialProof(prev => prev?.isUrgent ? null : prev);
      setIsUrgentActive(false); // מחזיר את השמש/ירח למקום
    }, 4000);
    return; 
  }
  
  // 2. הבדיקה הקריטית: אם הכפתור כבוי, אנחנו חייבים לנקות את ההודעה הקיימת ולעצור
  if (siteSettings.fomo_social_active === false) {
    setSocialProof(null); // זה השלב שמעלים את הבועית מהמסך מיד
    return;
  }

      const now = new Date();
      const fairDays = siteSettings.fair_days || [];
      if (fairDays.length === 0) { 
        if (!siteSettings.urgent_message || urgentDismissed) setSocialProof(null); 
        return; 
      }

      // --- חישוב טווח רציף (למשל: משלישי ב-20:00 עד רביעי ב-18:00) ---
      const firstDay = Math.min(...fairDays);
      const lastDay = Math.max(...fairDays);
      const [openH, openM] = (siteSettings.opening_hour || "12:00").split(':').map(Number);
      const [closeH, closeM] = (siteSettings.closing_hour || "20:30").split(':').map(Number);

      const startDate = new Date(now);
      startDate.setDate(now.getDate() - (now.getDay() - firstDay));
      startDate.setHours(openH, openM, 0, 0);

      const endDate = new Date(now);
      endDate.setDate(now.getDate() + (lastDay - now.getDay()));
      endDate.setHours(closeH, closeM, 0, 0);

      // האם היריד פעיל כרגע כטווח אחד ארוך?
      const isFairActive = now >= startDate && now <= endDate;

      if (!isFairActive) {
        setSocialProof(null);
        return;
      }

      // שליפת נתונים - מחפשים הזמנות מתחילת הטווח הנוכחי
      const { data: latestOrder } = await supabase
        .from('orders_log')
        .select('*')
        .gt('created_at', startDate.toISOString()) 
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const fomoProducts = products.filter(p => p.is_fomo && !p.is_sold_out && p.is_visible);
      const currentFomoString = fomoProducts.map(p => `נשארו בודדים מ${p.name}`).join('\n');

      // --- בדיקת חסימה: האם זו הזמנה חדשה שטרם הוסתרה? ---
      const isOrderBlocked = latestOrder && dismissedOrderId && latestOrder.id.toString() === dismissedOrderId.toString();
      
      const hasNewOrder = latestOrder && 
                          latestOrder.id.toString() !== (lastOrderShownId || "").toString() &&
                          !isOrderBlocked;

      const hasFomoChanged = currentFomoString !== lastFomoString;

      if (hasNewOrder) {
        const firstName = (latestOrder.customer_name || "").split(' ')[0];
        setSocialProof({ ...latestOrder, customer_name: firstName, isOrder: true });
        setLastOrderShownId(latestOrder.id);
        localStorage.setItem('lior_last_order_id', latestOrder.id);
        setLastEvent('order');
        localStorage.setItem('lior_last_event', 'order');
        setFomoDismissed(false);
      } 
      else if (hasFomoChanged) {
        if (currentFomoString !== "") {
          setSocialProof({ main_item: currentFomoString, isFomo: true });
          setLastEvent('fomo');
          localStorage.setItem('lior_last_event', 'fomo');
          setFomoDismissed(false);
        } else {
          setSocialProof(null);
          setLastEvent(null);
        }
        setLastFomoString(currentFomoString);
      } 
      else {
        // מציג הזמנה קיימת רק אם היא לא חסומה
        if (lastEvent === 'order' && latestOrder && !isOrderBlocked) {
            const firstName = (latestOrder.customer_name || "").split(' ')[0];
            setSocialProof({ ...latestOrder, customer_name: firstName, isOrder: true });
        } else if (currentFomoString !== "" && !fomoDismissed) {
            setSocialProof({ main_item: currentFomoString, isFomo: true });
        } else {
            setSocialProof(null);
        }
      }
    };

    const interval = setInterval(fetchNotification, 10000);
    fetchNotification();
    return () => clearInterval(interval);
    
    // --- הוספנו את dismissedOrderId למערך התלויות ---
  }, [siteSettings, products, urgentDismissed, fomoDismissed, lastOrderShownId, lastFomoString, lastEvent, dismissedOrderId]);


    useEffect(() => {
    localStorage.setItem('lior_active_cart', JSON.stringify(cart));
    // הסרנו את setSunDismissed(true) כדי שהבאנר לא ייעלם כשיש מוצרים בסל
  }, [cart, products]);

  const syncCartToSupabase = async (currentCart) => {
    // מנהלים לא צריכים לתעד את הסל של עצמם
    if (isAdmin || localStorage.getItem('lior_admin_device') === 'true') return;
    
    const visitorId = localStorage.getItem('lior_visitor_uuid');
    if (!visitorId) return;

    if (Object.keys(currentCart).length === 0) {
      // אם הסל התרוקן, נמחק מהטבלה
      await supabase.from('pending_carts').delete().eq('visitor_id', visitorId);
    } else {
      // עדכון או יצירה של הסל הנוכחי
      await supabase.from('pending_carts').upsert({
        visitor_id: visitorId,
        customer_name: customerName || "אנונימי",
        cart_data: currentCart,
        updated_at: new Date().toISOString()
      });
    }
  };


  // נוסיף useEffect שיפעיל את הסנכרון כשהסל משתנה
  useEffect(() => {
    const timer = setTimeout(() => {
      syncCartToSupabase(cart);
    }, 1000); // Debounce של שנייה כדי לא להעמיס על השרת בכל לחיצה
    return () => clearTimeout(timer);
  }, [cart, customerName]);

  const deletePendingOrder = async (visitorId) => {
    if (window.confirm("למחוק את הסל הזה מהרשימה?")) {
      const { error } = await supabase.from('pending_carts').delete().eq('visitor_id', visitorId);
      if (!error) {
        // עדכון הרשימה בתצוגה מיד לאחר המחיקה
        setPendingOrders(prev => prev.filter(order => order.visitor_id !== visitorId));
      } else {
        alert("שגיאה במחיקה: " + error.message);
      }
    }
  };

const isSaleActiveNow = siteSettings.sale_active && (new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0')) < siteSettings.sale_end_time;

  const v = products.filter(p => p.is_visible && (!filterGF || p.is_gluten_free));

  const statusInfo = (() => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const fairDays = siteSettings.fair_days || [];
    const firstFairDay = Math.min(...fairDays);
    const lastFairDay = Math.max(...fairDays);

    let isWithinHours = false;
    if (currentDay > firstFairDay && currentDay < lastFairDay) {
      isWithinHours = true;
    } else if (currentDay === firstFairDay && currentDay === lastFairDay) {
      isWithinHours = currentTime >= (siteSettings.opening_hour || '12:00') && currentTime <= (siteSettings.closing_hour || '20:30');
    } else if (currentDay === firstFairDay) {
      isWithinHours = currentTime >= (siteSettings.opening_hour || '12:00');
    } else if (currentDay === lastFairDay) {
      isWithinHours = currentTime <= (siteSettings.closing_hour || '20:30');
    }

    switch (siteSettings.site_status) {
      case 'open': return { text: 'פתחנו את הדוכן!', color: 'text-green-400', dotBg: 'bg-green-500' };
      case 'busy': return { text: 'המלאי עומד להיגמר', color: 'text-amber-400', dotBg: 'bg-amber-500' };
      case 'closed': 
        if (fairDays.includes(currentDay) && isWithinHours) {
          return { text: 'כעת ניתן להזמין', color: 'text-orange-500', dotBg: 'bg-red-500' };
        }
        return { 
          text: 'נתראה ביריד הבא', 
          color: 'text-red-400', 
          dotBg: 'bg-red-500' 
        };
      default: return null;
    }
  })();
  const getTimeLeft = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // סדר עדיפויות: אם יש מבצע פעיל, נציג את זמן סיום המבצע
    if (siteSettings.sale_active && currentTime < siteSettings.sale_end_time) {
      const [saleH, saleM] = siteSettings.sale_end_time.split(':').map(Number);
      const saleDate = new Date();
      saleDate.setHours(saleH, saleM, 0);
      const diff = saleDate - now;
      if (diff <= 0) return null;
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return { text: h > 0 ? `${h} שעות ו-${m} דקות` : `${m} דקות אחרונות`, type: 'sale' };
    }

    // אם אין מבצע, נציג את זמן סיום היריד כרגיל
    if (siteSettings.site_status !== 'open' || !siteSettings.closing_hour) return null;
    const [closeH, closeM] = siteSettings.closing_hour.split(':').map(Number);
    const closeDate = new Date();
    closeDate.setHours(closeH, closeM, 0);
    const diff = closeDate - now;
    if (diff <= 0 || diff > 4 * 60 * 60 * 1000) return null;
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { text: h > 0 ? `${h} שעות ו-${m} דקות` : `${m} דקות אחרונות`, type: 'closing' };
  };


  const resetWobbleTimer = () => {
    setIsWobbling(false);
    if (wobbleTimerRef.current) clearTimeout(wobbleTimerRef.current);
    wobbleTimerRef.current = setTimeout(() => {
      setIsWobbling(true);
      wobbleTimerRef.current = setTimeout(() => {
        resetWobbleTimer(); 
      }, 2000);
    }, 5000);
  };
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('view') === 'recipes') {
      setShowRecipesModal(true);
      fetchRecipeRanks(); // <--- קריטי: שולף את המדליות כשהחלונית נפתחת
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (recipes.length > 0) {
      const recipeId = params.get('recipe');
      if (recipeId) {
        const found = recipes.find(r => r.id.toString() === recipeId);
        if (found) {
          setSelectedRecipe(found);
          logRecipeView(found, 'direct_link'); // תיעוד כניסה מקישור (לא נספר למדליות)
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }
  }, [recipes]);


  const handleRecipesShare = async () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('view', 'recipes');
    const shareUrl = url.toString();
    const shareText = `כל המתכונים של ליאור בן משה במקום אחד! 🥐📖`;
    
    if (navigator.share) {
      try { await navigator.share({ title: 'המתכונים של ליאור', text: shareText, url: shareUrl }); }
      catch (err) { window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank'); }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank');
    }
  };


  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedPastryApp');
    initApp();

    const recordVisit = async () => {
      if (localStorage.getItem('lior_admin_device') === 'true') return;

      const todayStr = new Date().toDateString();
      const lastRecorded = localStorage.getItem('lior_last_unique_visit');

      if (lastRecorded === todayStr) return;

      let visitorId = localStorage.getItem('lior_visitor_uuid');
      if (!visitorId) {
          visitorId = 'v_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('lior_visitor_uuid', visitorId);
      }

      // --- זיהוי המקור ---
      let source = 'direct';
      
      // בדיקה אם נכנס דרך מתכון
      // בדיקה אם נכנס דרך מתכון או רשימת מתכונים
      const urlParams = new URLSearchParams(window.location.search);
      const isRecipeEntry = urlParams.get('recipe') || urlParams.get('view') === 'recipes';

      if (isRecipeEntry) {
        source = 'Recipe Link'; 
      } else {

        // בדיקת מקורות רגילה
        const ref = document.referrer.toLowerCase();
        if (ref.includes('facebook.com') || ref.includes('fb.me')) source = 'Facebook';
        else if (ref.includes('instagram.com')) source = 'Instagram';
        else if (ref.includes('google.com')) source = 'Google';
        else if (ref.includes('whatsapp.com')) source = 'WhatsApp';
        else if (ref !== '') source = 'Other';
      }

      try {
        await supabase.from('site_visits').insert([{ visitor_id: visitorId, source: source }]);
        localStorage.setItem('lior_last_unique_visit', todayStr);
      } catch (e) { console.error("Visit recording failed", e); }
    };

    recordVisit();

    if (hasVisited) {
      setLoading(false);
    } else {
      const minLoadingTime = setTimeout(() => {
        setFadeLoading(true);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('hasVisitedPastryApp', 'true');
        }, 500); 
      }, 1500);
      return () => clearTimeout(minLoadingTime);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) { 
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 10);
    }
  }, [isAdmin]);

 const updateQty = (id, delta, variantName = null) => {
    const cartKey = variantName ? `${id}__${variantName}` : `${id}`;

    if (delta > 0 && !isVeganStatsDismissed && !hasShownCompassion) { 
      setPulse(true); 
      resetWobbleTimer();
      if (compassionTimeoutRef.current) clearTimeout(compassionTimeoutRef.current);
      setShowCompassion(true); 
      setHasShownCompassion(true); // מבטיח שזה יופיע רק פעם אחת עד הריענון הבא
      compassionTimeoutRef.current = setTimeout(() => setShowCompassion(false), 4000); 
      setTimeout(() => setPulse(false), 1000); 
    }


    setCart(prev => {
      const currentQty = prev[cartKey] || 0;
      const newQty = Math.max(0, currentQty + delta);
      const nextCart = { ...prev };

      if (newQty === 0) delete nextCart[cartKey];
      else nextCart[cartKey] = newQty;

      // חישוב מחדש של כמות המאפים (כולל וריאציות) להצגת התראת הקופסה
      const totalPastries = Object.entries(nextCart).reduce((sum, [key, qty]) => {
        const [pid] = key.split('__');
        const p = products.find(prod => prod.id === Number(pid));
        if (p && (p.category === 'pastries' || !p.category)) return sum + qty;
        return sum;
      }, 0);

      if (totalPastries > 0 && totalPastries % 2 !== 0) {
        if (boxTimeoutRef.current) clearTimeout(boxTimeoutRef.current);
        setShowBoxAlert(true);
        boxTimeoutRef.current = setTimeout(() => setShowBoxAlert(false), 3000);
      } else { setShowBoxAlert(false); }

      return nextCart;
    });
  };

   // --- פונקציה חדשה לעדכון הסל רק בלחיצה על "סיימתי" ---
  const handleConfirmVariants = () => {
    setCart(prev => {
      const nextCart = { ...prev };
      // מנקים בחירות קודמות של המוצר הזה
      Object.keys(nextCart).forEach(key => {
        if (key.startsWith(`${selectedVariantProduct.id}__`)) {
          delete nextCart[key];
        }
      });
      // מוסיפים את מה שנבחר בחלונית
      Object.entries(variantSelections).forEach(([variant, qty]) => {
        if (qty > 0) {
          nextCart[`${selectedVariantProduct.id}__${variant}`] = qty;
        }
      });
      return nextCart;
    });

    // אפקטים של הוספה לסל
    setPulse(true);
    resetWobbleTimer();
    setShowCompassion(true);
    setTimeout(() => setPulse(false), 1000);
    setTimeout(() => setShowCompassion(false), 4000);

    setShowVariantModal(false); // סוגר את החלונית
  };


 const clearCart = () => { 
    setCart({}); 
    setShowBoxAlert(false); 
    localStorage.removeItem('lior_active_cart'); 
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((sum, [key, qty]) => {
      const [idStr] = key.split('__');
      const product = products.find(p => p.id === Number(idStr));
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  const isCouponValid = () => siteSettings.coupon_active && siteSettings.coupon_code && appliedCoupon.trim() === siteSettings.coupon_code;

  const getFinalTotal = () => {
    let total = calculateTotal();

    // בדיקה אם המבצע פעיל כרגע (ללא קשר ליריד)
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const isSaleNow = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;

    if (isSaleNow) {
      let saleTotal = 0;
      Object.entries(cart).forEach(([key, qty]) => {
        const [idStr] = key.split('__');
        const product = products.find(p => p.id === Number(idStr));
        if (product) {
          let itemPrice = product.price * qty;
          // הנחה רק אם הקטגוריה ברשימה
          if (siteSettings.sale_categories?.includes(product.category || 'pastries')) {
            itemPrice = itemPrice * (1 - (siteSettings.sale_discount_percent / 100));
          }
          saleTotal += itemPrice;
        }
      });
      // במבצע סוף יום - מחזירים רק את המחיר הזה פלוס משלוח, בלי כפל מבצעים
      let final = Math.round(saleTotal);
      if (selectedOrderOption) final += selectedOrderOption.cost;
      return final;
    }

    // --- לוגיקה רגילה (אם אין מבצע סוף יום) ---
    if (selectedOrderOption) total += selectedOrderOption.cost;
    if (goldenWinnerItem) total -= goldenWinnerItem.price;

    if (isCouponValid()) {
      const discount = total * (siteSettings.coupon_discount_percent / 100);
      return Math.round(total - discount);
    }

    if (!isDiscountActive) return total;

    if (siteSettings.reward_type === '12_percent') return Math.round(total * 0.88);
    if (siteSettings.reward_type === '5_percent') return Math.round(total * 0.95);
    if (siteSettings.reward_type === '6th_free') {
      const pastryPrices = [];
      products.forEach(p => {
        if ((p.category === 'pastries' || !p.category) && cart[p.id] > 0) {
          for (let i = 0; i < cart[p.id]; i++) pastryPrices.push(p.price);
        }
      });
      if (pastryPrices.length >= 6) {
        const freeCount = Math.floor(pastryPrices.length / 6);
        const discount = pastryPrices.sort((a, b) => a - b).slice(0, freeCount).reduce((sum, price) => sum + price, 0);
        return total - discount;
      }
    }
    return total;
  };

  const getCompassionStats = () => {
    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    return { eggs: (totalItems * 0.5).toFixed(1), milk: (totalItems * 0.1).toFixed(1) };
  };

  const handleLogoClick = () => {
    if (siteSettings.reward_type === 'none') return;
    setLogoClicks(prev => {
      const next = prev + 1;
      if (next >= 3) {
        if (isDiscountActive) {
          setShowAlreadyActiveModal(true);
        } else {
          setIsDiscountActive(true); 
          localStorage.setItem('lior_discount_active', 'true');
          localStorage.setItem('lior_discount_type', siteSettings.reward_type);
          setShowDiscountModal(true); 
        }
        return 0; 
      }
      return next;
    });
  };

  const handleSiteShare = async () => {
    const shareText = `היי, תראו איזה מאפים מעולים ב-${siteSettings.main_title}! 🥐✨`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: siteSettings.main_title, text: shareText, url: shareUrl }); }
      catch (err) { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank'); }
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank');
    }
  };

  const handleNavigation = () => {
    setShowNavModal(true);
  };

  const openNavigationApp = (app) => {
    const addr = encodeURIComponent(siteSettings.address);
    let url = "";
    switch (app) {
      case 'waze': url = `https://waze.com/ul?q=${addr}`; break;
      case 'google': url = `https://www.google.com/maps/search/?api=1&query=${addr}`; break;
      case 'apple': url = `maps://?q=${addr}`; break;
      default: url = `https://waze.com/ul?q=${addr}`;
    }
    window.open(url, '_blank');
    setShowNavModal(false);
  };

  // Logic for Golden Pastry check
  const checkGoldenPastry = async () => {
    if (!siteSettings.golden_pastry_active) return false;

    const pastriesInCart = products.filter(p => (p.category === 'pastries' || !p.category) && cart[p.id] > 0);
    const totalPastriesInCart = pastriesInCart.reduce((sum, p) => sum + cart[p.id], 0);

    if (totalPastriesInCart === 0) return false;

    const currentCounter = siteSettings.golden_pastry_counter || 0;
    const target = siteSettings.golden_pastry_target || 50;
    const nextCounter = currentCounter + totalPastriesInCart;

    // Check if we crossed a dynamic multiple
    if (Math.floor(nextCounter / target) > Math.floor(currentCounter / target)) {
       // Find cheapest pastry in cart
       const sortedByPrice = pastriesInCart.sort((a,b) => a.price - b.price);
       setGoldenWinnerItem(sortedByPrice[0]);
       setShowGoldenModal(true);
       return true;
    }
    return false;
  };

const finalizeOrder = async () => {
    const cartItems = Object.entries(cart);
    if (cartItems.length === 0) return;

    // --- 1. חישובים לוגיים (קורים בשבריר שנייה בדפדפן) ---
    let wonItem = null;
    let isWinner = false;

    if (siteSettings.golden_pastry_active) {
        const pastriesInCart = products.filter(p => (p.category === 'pastries' || !p.category) && cart[p.id] > 0);
        const totalPastriesInCart = pastriesInCart.reduce((sum, p) => sum + cart[p.id], 0);

        if (totalPastriesInCart > 0) {
            const currentCounter = siteSettings.golden_pastry_counter || 0;
            const target = siteSettings.golden_pastry_target || 50;
            const nextCounter = currentCounter + totalPastriesInCart;

            if (Math.floor(nextCounter / target) > Math.floor(currentCounter / target)) {
                const sortedByPrice = pastriesInCart.sort((a,b) => a.price - b.price);
                wonItem = sortedByPrice[0];
                isWinner = true;
            }
        }
    }

    // הכנת ההודעה
    let itemsList = "";
    cartItems.forEach(([key, qty]) => {
      const [idStr, variant] = key.split('__');
      const p = products.find(prod => prod.id === Number(idStr));
      if (p) {
        const nameDisplay = variant ? `${p.name} (${variant})` : p.name;
        itemsList += `- ${qty} ${nameDisplay} = ₪${p.price * qty}\n`;
      }
    });

    const recipient = siteSettings.whatsapp_recipient_name || "ליאור";
const prefix = selectedOrderOption?.is_pickup 
  ? `היי ${recipient}, אגיע ל${siteSettings.main_title}, זאת ההזמנה שלי:` 
  : (selectedOrderOption?.message_prefix?.replace("ליאור", recipient) || `היי ${recipient}, זאת ההזמנה שלי:`);
let msg = `${prefix}\n\n${itemsList}`;

    if (selectedOrderOption && selectedOrderOption.cost > 0) {
      msg += `*${selectedOrderOption.label}: ₪${selectedOrderOption.cost}*\n`;
    }
    msg += `\n`;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;
    
    let finalCalcTotal = calculateTotal(); 
    if (selectedOrderOption) finalCalcTotal += selectedOrderOption.cost;

// ... אחרי ה-if/else של ה-isSale ...
if (selectedGiftItem) {
    msg += `\n*🎁 מתנה שהוספתי לסל: ${selectedGiftItem.name} (בחינם)* ✨\n`;
}

    if (isSale) {
        msg += `*🔥 הופעל מבצע סוף יום: ${siteSettings.sale_discount_percent}% הנחה! 🔥*\n`;
        let saleTotal = 0;
        Object.entries(cart).forEach(([key, qty]) => {
            const [idStr] = key.split('__');
            const p = products.find(prod => prod.id === Number(idStr));
            if (p) {
                let itemPrice = p.price * qty;
                if (siteSettings.sale_categories?.includes(p.category || 'pastries')) {
                    itemPrice = itemPrice * (1 - (siteSettings.sale_discount_percent / 100));
                }
                saleTotal += itemPrice;
            }
        });
        finalCalcTotal = Math.round(saleTotal);
        if (selectedOrderOption) finalCalcTotal += selectedOrderOption.cost;
    } else {
    // בתוך ה-else של ה-!isWinner או בסוף finalizeOrder
setSelectedGiftItem(null);
        if (isWinner && wonItem) {
            msg += `*🌟 יואו איזה כיף! זכיתי במאפה ה-${siteSettings.golden_pastry_target} במתנה! 🌟*\n`;
            msg += `*(קיבלתי את ה${wonItem.name} בחינם)* 🎁\n`;
            finalCalcTotal -= wonItem.price; 
        }
        
        if (isCouponValid()) {
            msg += `*הופעל קוד קופון: ${appliedCoupon} (-${siteSettings.coupon_discount_percent}%)* ✨\n`;
            const discount = finalCalcTotal * (siteSettings.coupon_discount_percent / 100);
            finalCalcTotal = Math.round(finalCalcTotal - discount);
        }
        
        if (isDiscountActive) {
             if (siteSettings.reward_type === '12_percent') {
                 msg += `*הופעלה הנחה סודית 12%! ✨*\n`;
                 finalCalcTotal = Math.round(finalCalcTotal * 0.88);
             } else if (siteSettings.reward_type === '5_percent') {
                 msg += `*הופעלה הנחה סודית 5%! ✨*\n`;
                 finalCalcTotal = Math.round(finalCalcTotal * 0.95);
             } else if (siteSettings.reward_type === '6th_free') {
                  const pastryPrices = [];
                  products.forEach(p => {
                    if ((p.category === 'pastries' || !p.category) && cart[p.id] > 0) {
                      for (let i = 0; i < cart[p.id]; i++) pastryPrices.push(p.price);
                    }
                  });
                  if (pastryPrices.length >= 6) {
                     msg += `*הופעלה הטבה: מאפה שישי במתנה! 🥐✨*\n`;
                     const freeCount = Math.floor(pastryPrices.length / 6);
                     const discount = pastryPrices.sort((a, b) => a - b).slice(0, freeCount).reduce((sum, price) => sum + price, 0);
                     finalCalcTotal -= discount;
                  }
             }
        }
    }

    msg += `*סכום סופי לתשלום: ₪${Math.max(0, finalCalcTotal)}*\n\n`;
    if (selectedOrderOption?.is_pickup && pickupTime) msg += `אגיע לאסוף מהיריד בשעה ${pickupTime}\n\n`;
const paymentDetails = siteSettings.payment_details || "0547741436";

if (selectedOrderOption?.is_pickup) {
    msg += `*ניתן להעביר בביט או פייבוקס למספר ${paymentDetails}*\n*או מזומן/אשראי ביריד עצמו*\n`;
} else {
    msg += `*ניתן להעביר בביט או פייבוקס למספר ${paymentDetails}*\n`;
}    msg += `*❤️אנא חכו לאישור ההזמנה לפני העברת התשלום🙏*`;
    if (customerName) msg += `\n\nשם המזמין: ${customerName}`;
    if (selectedOrderOption?.is_pickup) {
        msg += `\nשימו לב❤️ היריד נסגר ב ${siteSettings.whatsapp_closing_hour || siteSettings.closing_hour}, אנא השתדלו להגיע עד כחצי שעה לפני הסגירה.`;
    }

    const whatsappUrl = `https://wa.me/${siteSettings.whatsapp_number}?text=${encodeURIComponent(msg)}`;
    
    // --- 2. פעולות UI מיידיות ---
    setShowPickupModal(false); 
    localStorage.setItem('last_successful_order', JSON.stringify(cart));
    if (customerName) localStorage.setItem('lior_customer_name', customerName);

    if (isWinner) {
        setGoldenWinnerItem(wonItem);
        setPendingWhatsappLink(whatsappUrl);
        setShowGoldenModal(true);
    } else {
        // פתיחת וואטסאפ מיד!
        window.open(whatsappUrl, '_blank');
        const url = new URL(window.location);
url.searchParams.set('view', 'thanks');
window.history.pushState({}, '', url);
        setShowThankYouModal(true);
        // איפוס סל מקומי
        setCart({});
        setShowBoxAlert(false);
        localStorage.removeItem('lior_active_cart');
        setIsDiscountActive(false);
        localStorage.removeItem('lior_discount_active');
        localStorage.removeItem('lior_discount_type');
        setSelectedOrderOption(null);
        setAppliedCoupon(""); 
    }

    // --- 3. עדכון Database "ברקע" (ללא await שיעצור את התהליך) ---
    (async () => {
        try {
            const cartItemsForDb = Object.entries(cart);
            const totalPastriesInOrder = cartItemsForDb.reduce((sum, [key, qty]) => {
               const [idStr] = key.split('__');
               const p = products.find(prod => prod.id === Number(idStr));
               if (p && (p.category === 'pastries' || !p.category)) return sum + qty;
               return sum;
            }, 0);

            // מונה מאפה מוזהב
            if (siteSettings.golden_pastry_active) {
                await supabase.from('settings').update({ 
                  golden_pastry_counter: (siteSettings.golden_pastry_counter || 0) + totalPastriesInOrder 
                }).eq('id', 1);
            }
            
            // לוג הזמנה
            const sortedItems = [...cartItemsForDb].sort((a,b) => b[1] - a[1]);
            if (sortedItems.length > 0) {
                const topItemKey = sortedItems[0][0];
                const [topId] = topItemKey.split('__');
                const topProduct = products.find(p => p.id === Number(topId));
                await supabase.from('orders_log').insert([{ 
                    customer_name: customerName || "מישהו/י", 
                    main_item: topProduct?.name || "מגוון מאפים" 
                }]);
            }
           
            // מחיקת סל ממתין
            const visitorId = localStorage.getItem('lior_visitor_uuid');
            await supabase.from('pending_carts').delete().eq('visitor_id', visitorId);

            // עדכון מלאי
            const updates = cartItemsForDb.map(([key, qty]) => {
                const [idStr, variant] = key.split('__');
                const p = products.find(prod => prod.id === Number(idStr));
                if (p) {
                    let newStock = p.stock;
                    let newVariantStock = { ...(p.variant_stock || {}) };
                    let newSaleStock = p.sale_stock;
                    let soldOut = p.is_sold_out;
                    let fomo = p.is_fomo;

                    if (newStock !== null) newStock = Math.max(0, newStock - qty);
                    if (variant && newVariantStock[variant] !== undefined) newVariantStock[variant] = Math.max(0, newVariantStock[variant] - qty);
                    if (isSale && p.sale_stock !== null && siteSettings.sale_categories?.includes(p.category || 'pastries')) {
                        newSaleStock = Math.max(0, p.sale_stock - qty);
                    }

                    const effectiveStock = isSale && p.sale_stock !== null ? newSaleStock : newStock;
                    if (effectiveStock !== null) {
                        if (effectiveStock === 0) { soldOut = true; fomo = false; }
                        else if (effectiveStock < 5) { fomo = true; soldOut = false; }
                        else { soldOut = false; fomo = false; }
                    }

                    return supabase.from('products').update({ 
                        sales_count: (p.sales_count || 0) + qty,
                        stock: newStock,
                        variant_stock: newVariantStock,
                        sale_stock: newSaleStock,
                        is_sold_out: soldOut,
                        is_fomo: fomo
                    }).eq('id', p.id);
                }
                return null;
            }).filter(Boolean);

            await Promise.all(updates);
            fetchProducts();
            fetchSettings();
        } catch (e) {
            console.error("Background sync failed:", e);
        }
    })();
};


  const handleRestoreOrder = () => {
    const saved = localStorage.getItem('last_successful_order');
    if (saved) {
      const parsedCart = JSON.parse(saved);
      setCart(parsedCart);
      const totalPastries = products.filter(p => p.category === 'pastries' || !p.category).reduce((sum, p) => sum + (parsedCart[p.id] || 0), 0);
      if (totalPastries > 0 && totalPastries % 2 !== 0) {
        if (boxTimeoutRef.current) clearTimeout(boxTimeoutRef.current);
        setShowBoxAlert(true);
        boxTimeoutRef.current = setTimeout(() => setShowBoxAlert(false), 3000);
      }
    }
  };

  const handleWhatsAppClick = async () => {
    const hasItems = Object.keys(cart).length > 0;
    if (!hasItems) { setShowEmptyCartModal(true); return; }

    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const fairDays = siteSettings.fair_days || [];
    const firstFairDay = Math.min(...fairDays);
    const lastFairDay = Math.max(...fairDays);

    let isWithinHours = false;
    if (currentDay > firstFairDay && currentDay < lastFairDay) {
      isWithinHours = true;
    } else if (currentDay === firstFairDay && currentDay === lastFairDay) {
      isWithinHours = currentTime >= (siteSettings.opening_hour || '12:00') && currentTime <= (siteSettings.closing_hour || '20:30');
    } else if (currentDay === firstFairDay) {
      isWithinHours = currentTime >= (siteSettings.opening_hour || '12:00');
    } else if (currentDay === lastFairDay) {
      isWithinHours = currentTime <= (siteSettings.closing_hour || '20:30');
    }

    // שלב 1: בדיקה אם אנחנו מחוץ לשעות/ימים
    if (!fairDays.includes(currentDay) || !isWithinHours) { 
      setShowDayWarning(true); 
    } else { 
      // אם הכל תקין, עוברים לבדיקת המאפים
      checkPastryCompleteness();
    }
  };

  // פונקציה חדשה שמנהלת את המשך הזרימה (בדיקת מאפים חסרים -> מאפה מוזהב -> מילוי פרטים)
  const checkPastryCompleteness = async () => {
    const remainder = totalPastriesInCart % 6;
    const isMissingForBonus = isDiscountActive && siteSettings.reward_type === '6th_free' && remainder !== 0;

    if (isMissingForBonus) {
      setShowPastryWarning(true);
    } else {
      continueToOrderDetails();
    }
  };

const continueToOrderDetails = async () => {
    // בדיקה אם המבצע פעיל והלקוח עבר את הסכום
    const totalForPromo = calculateTotal(); // חישוב לפני הנחות
    if (siteSettings.threshold_promo_active && 
        totalForPromo >= siteSettings.threshold_promo_limit && 
        siteSettings.threshold_promo_items?.length > 0 &&
        !selectedGiftItem) { // אם עוד לא נבחרה מתנה
        setShowThresholdGiftModal(true);
    } else {
        setShowPickupModal(true);
    }
};




  const resetStats = async () => {
    if (window.confirm("האם לאפס את כל הסטטיסטיקה?")) {
      await supabase.from('products').update({ sales_count: 0 }).neq('id', 0);
      fetchProducts();
    }
  };

  const fetchVisits = async () => {
    // 1. שליפת ביקורים כלליים
    const { data: visits, error } = await supabase
      .from('site_visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5000); 
    if (visits) setVisitData(visits);

    // 2. טעינת מספר הלחיצות על "תתזכר אותי"
    const { count } = await supabase.from('site_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_name', 'reminder_click');
    setReminderCount(count || 0);

const { data: aboutEvents } = await supabase
  .from('site_events')
  .select('metadata') // <--- קודם ה-select
  .eq('event_name', 'about_view'); // <--- רק אחר כך ה-eq

    if (aboutEvents) {
      const counts = aboutEvents.reduce((acc, curr) => {
        const type = curr.metadata?.view_type || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, { direct_link: 0, internal_click: 0 });
      
      setAboutStats(counts);
    }
  };  

  // פונקציה לרישום לחיצה חדשה
  const logReminderClick = async () => {
    await supabase.from('site_events').insert([{ event_name: 'reminder_click' }]);
    fetchVisits(); // עדכון המונה מיד בתצוגה
  };

  const getVisitStats = () => {
    const now = new Date();
    const todayStr = now.toDateString();

    const todayData = visitData.filter(v => new Date(v.created_at).toDateString() === todayStr);
    const weekData = visitData.filter(v => (now - new Date(v.created_at)) / (1000 * 60 * 60 * 24) <= 7);
    const monthData = visitData.filter(v => (now - new Date(v.created_at)) / (1000 * 60 * 60 * 24) <= 30);

    const dailyBreakdown = [];
    for(let i=0; i<7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const count = visitData.filter(v => new Date(v.created_at).toDateString() === d.toDateString()).length;
        dailyBreakdown.push({ label: i === 0 ? 'היום' : d.toLocaleDateString('he-IL', {weekday: 'short', day: 'numeric'}), count });
    }

    const getSources = (data) => {
        const sources = {};
        data.forEach(v => {
           const src = v.source || 'direct';
           sources[src] = (sources[src] || 0) + 1;
        });
        return Object.entries(sources).sort((a,b) => b[1] - a[1]);
    };

    return { 
      today: todayData.length, 
      week: weekData.length, 
      month: monthData.length, 
      dailyBreakdown,
      sources: {
        today: getSources(todayData),
        week: getSources(weekData),
        month: getSources(monthData)
      }
    };
  };

  const handleResetTodayVisits = async () => {
    if (window.confirm("לאפס כניסות של היום בלבד?")) {
        const todayStart = new Date();
        todayStart.setHours(0,0,0,0);
        const { error } = await supabase.from('site_visits').delete().gte('created_at', todayStart.toISOString());
        if (!error) { 
            await fetchVisits(); 
            alert("כניסות היום אופסו"); 
        } else { alert("שגיאה: " + error.message); }
    }
  };

  const handleResetAllVisits = async () => {
    if (window.confirm("האם לאפס את כל הסטטיסטיקה של כל הזמנים? פעולה זו אינה הפיכה!")) {
        const { error } = await supabase.from('site_visits').delete().neq('visitor_id', '_blank_');
        if (!error) { 
            await fetchVisits(); 
            alert("כל ההיסטוריה אופסה"); 
        } else { alert("שגיאה: " + error.message); }
    }
  };
 
 

const handleSaveProduct = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const category = formData.get('category');

  // 1. עיבוד הסוגים והמלאי מה-State החדש
  const variantsArray = tempVariants.map(v => v.name.trim()).filter(Boolean);
  const variantStockObj = {};
  tempVariants.forEach(v => {
    if (v.name.trim()) {
      // תיקון: אם השדה ריק לגמרי (v.stock === ""), שומרים null.
      // רק אם יש תוכן, הופכים למספר.
      const stockInput = String(v.stock).trim();
      variantStockObj[v.name.trim()] = stockInput === "" ? null : Number(stockInput);
    }
  });


  // 2. קביעת מלאי כללי
  const stockVal = formData.get('stock') === "" ? null : Number(formData.get('stock'));

  // 3. לוגיקת טריגרים אוטומטית (SOLD OUT / FOMO)
  // אם יש מלאי כללי, נעדכן את הסטטוסים לפיו
  let autoSoldOut = false;
  let autoFomo = false;

  if (stockVal !== null) {
    if (stockVal === 0) {
      autoSoldOut = true;
    } else if (stockVal < 5) {
      autoFomo = true;
    }
  }

  // 4. בניית אובייקט הנתונים לשליחה ל-Supabase
  const productData = {
    name: formData.get('name'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
    heating_instructions: (category === 'desserts' || categories.find(c => c.slug === category)?.name === 'קינוחים') 
      ? formData.get('heating_instructions') : null,
    image: formData.get('image'),
    category: category,
    is_gluten_free: formData.get('is_gluten_free') === 'on',
    stock: stockVal,
    // אלו השדות החדשים:
    variants: variantsArray.length > 0 ? variantsArray : null,
    variant_stock: variantStockObj,
    is_sold_out: autoSoldOut,
    is_fomo: autoFomo
  };

  // 5. חישוב סדר תצוגה
  if (editingProduct) {
    productData.display_order = editingProduct.display_order;
  } else {
    const catItems = products.filter(p => p.category === category);
    productData.display_order = catItems.length > 0 ? Math.max(...catItems.map(p => p.display_order)) + 1 : 0;
    productData.is_visible = true;
  }

  // 6. ביצוע העדכון ב-Supabase
  if (editingProduct) { 
    await supabase.from('products').update(productData).eq('id', editingProduct.id); 
  } else { 
    await supabase.from('products').insert([productData]); 
  }

  // סגירת מודאל וניקוי
  setTempVariants([]);
  setEditingProduct(null); 
  setShowAddItemModal(false); 
  await fetchProducts();
};



  const duplicateProduct = async (p) => {
    if (!window.confirm(`האם לשכפל את "${p.name}"?`)) return;
    const { id, created_at, sales_count, ...cleanData } = p;
    cleanData.name = cleanData.name + " (עותק)";
    await supabase.from('products').insert([cleanData]);
    await fetchProducts();
  };

  const toggleSoldOut = async (p) => { await supabase.from('products').update({ is_sold_out: !p.is_sold_out }).eq('id', p.id); await fetchProducts(); };
  const toggleVisible = async (p) => { await supabase.from('products').update({ is_visible: !p.is_visible }).eq('id', p.id); await fetchProducts(); };
  const toggleFomo = async (p) => { await supabase.from('products').update({ is_fomo: !p.is_fomo }).eq('id', p.id); await fetchProducts(); };
  const deleteProduct = async (id) => { 
  if (window.confirm("בטוח שרוצה למחוק את המוצר לצמיתות?")) { 
    await supabase.from('products').delete().eq('id', id); 
    
    // פקודות הסגירה שחסרו:
    setEditingProduct(null); 
    setShowAddItemModal(false); 
    
    await fetchProducts(); 
  } 
};

  const onDragStart = (index) => { if (!adminSearch) setDraggedItemIndex(index); };
  const onDragOver = (e) => { e.preventDefault(); };
  const onDrop = async (index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    const newProducts = [...products];
    const draggedItem = newProducts.splice(draggedItemIndex, 1)[0];
    newProducts.splice(index, 0, draggedItem);
    const updatedWithOrder = newProducts.map((p, i) => ({ ...p, display_order: i }));
    setProducts(updatedWithOrder);
    setDraggedItemIndex(null);
    await supabase.from('products').upsert(updatedWithOrder.map(p => ({ id: p.id, display_order: p.display_order })));
  };

  const onCatDragStart = (index) => { setDraggedCatIndex(index); };
  const onCatDrop = async (index) => {
    if (draggedCatIndex === null || draggedCatIndex === index) return;
    const newCategories = [...categories];
    const draggedItem = newCategories.splice(draggedCatIndex, 1)[0];
    newCategories.splice(index, 0, draggedItem);
    const updatedWithOrder = newCategories.map((c, i) => ({ ...c, display_order: i }));
    setCategories(updatedWithOrder);
    setDraggedCatIndex(null);
    await supabase.from('categories').upsert(updatedWithOrder.map(c => ({ id: c.id, display_order: c.display_order })));
  };

  const handleLogin = () => { 
    if (loginPass === siteSettings.password) { 
      setIsAdmin(true); 
      setShowLoginModal(false); 
      setLoginPass(""); 
      localStorage.setItem('lior_admin_device', 'true');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else alert("קוד שגוי"); 
  };

  const handlePasswordChange = async () => {
    if (passForm.old !== siteSettings.password) {
      alert("סיסמה נוכחית שגויה!");
      return;
    }
    if (passForm.new.length < 4) {
      alert("סיסמה חדשה חייבת להיות לפחות 4 תווים");
      return;
    }

    const newSettings = { ...siteSettings, password: passForm.new };
    const { error } = await supabase.from('settings').update({ password: passForm.new }).eq('id', 1);

    if (error) {
      alert("שגיאה בעדכון הסיסמה בשרת");
    } else {
      setSiteSettings(newSettings);
      setShowPasswordModal(false);
      setPassForm({ old: "", new: "" });
      alert("הסיסמה שונתה בהצלחה!");
    }
  };

  const scrollToCategory = (id) => { const element = document.getElementById(id + (isAdmin ? '-admin' : '')); if (element) { const offset = isAdmin ? 140 : 180; window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' }); } };

  useEffect(() => { 
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    resetWobbleTimer(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function fetchOrderOptions() { const { data } = await supabase.from('order_options').select('*').order('id', { ascending: true }); if (data) setOrderOptions(data); }
  
  // הוספנו את fetchRecipes לרשימת הטעינה
  async function initApp() { await Promise.all([fetchProducts(), fetchSettings(), fetchRecipeRanks(), fetchVisits(), fetchCategories(), fetchOrderOptions(), fetchRecipeCats(), fetchRecipes()]); }
  
  async function fetchProducts() { const { data } = await supabase.from('products').select('*').order('display_order', { ascending: true }); if (data) setProducts(data); }
  
  async function fetchSettings() { 
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single(); 
      if (data) {
      setSiteSettings(data);

      if (data.popup_active && data.popup_text) {
        const popupShown = sessionStorage.getItem('lior_popup_shown');
        if (!popupShown) {
          setShowWelcomePopup(true);
          sessionStorage.setItem('lior_popup_shown', 'true');
        }
      }

      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      if (data.sale_active && currentTime < data.sale_end_time) {
          const alreadyShown = sessionStorage.getItem('sale_modal_shown');
          if (!alreadyShown) {
              setShowSaleModal(true);
              sessionStorage.setItem('sale_modal_shown', 'true');
          }
      }

      const savedActive = localStorage.getItem('lior_discount_active') === 'true';
      const savedType = localStorage.getItem('lior_discount_type');

      if (savedActive) {
        if (data.reward_type === 'none' || data.reward_type !== savedType) {
          setIsDiscountActive(false);
          localStorage.removeItem('lior_discount_active');
          localStorage.removeItem('lior_discount_type');
        }
      }
    } 
  }

  async function fetchCategories() { const { data } = await supabase.from('categories').select('*').order('display_order', { ascending: true }); if (data) setCategories(data); }
  
  // הנה הפונקציה שהייתה חסרה לך!
  async function saveSiteSettings() { await supabase.from('settings').upsert({ id: 1, ...siteSettings }); }

  // טעינת מתכונים וקטגוריות
  async function fetchRecipes() { 
    const { data } = await supabase.from('recipes').select('*').order('display_order', { ascending: true }); 
    if (data) setRecipes(data); 
  }
  async function fetchRecipeCats() {
    const { data } = await supabase.from('recipe_categories').select('*').order('display_order', { ascending: true });
    if (data) setRecipeCats(data);
  }

  // שמירת מתכון - הגרסה המתוקנת והמלאה
  const handleSaveRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // חישוב המיקום: אם עורכים - שומרים על הקיים. אם חדש - לוקחים את המקסימום + 1
    const currentMax = recipes.length > 0 ? Math.max(...recipes.map(r => r.display_order || 0)) : 0;
    const nextOrder = currentMax + 1;

    const recipeData = {
      title: formData.get('title'),
      author_name: formData.get('author_name'), // <--- הנה השורה שהוספנו (זה מה שחסר אצלך)
      image: formData.get('image'),
      content: formData.get('content'),
      category_slug: formData.get('category_slug'),
      // תיקון קריטי: שמירה על הסדר הקיים בעריכה
      display_order: editingRecipe ? editingRecipe.display_order : nextOrder 
    };

    if (editingRecipe) {
      await supabase.from('recipes').update(recipeData).eq('id', editingRecipe.id);
    } else {
      await supabase.from('recipes').insert([recipeData]);
    }
    
    setEditingRecipe(null);
    setShowRecipeFormModal(false);
    
    // טעינה מחדש כדי לסדר את הרשימה
    await fetchRecipes(); 
  };


  // שמירת קטגוריית מתכונים
  const handleSaveRecipeCat = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nextOrder = recipeCats.length > 0 ? Math.max(...recipeCats.map(c => c.display_order || 0)) + 1 : 0;
    
    const catData = {
      name: formData.get('name'),
      slug: editingRecipeCat ? editingRecipeCat.slug : `rcat_${Date.now()}`,
      display_order: editingRecipeCat ? editingRecipeCat.display_order : nextOrder
    };

    if (editingRecipeCat) {
      await supabase.from('recipe_categories').update(catData).eq('id', editingRecipeCat.id);
    } else {
      await supabase.from('recipe_categories').insert([catData]);
    }
    setEditingRecipeCat(null);
    await fetchRecipeCats();
  };

  // גרירת מתכונים
  const onRecipeDragStart = (index) => { setDraggedRecipeIndex(index); };
  const onRecipeDrop = async (index) => {
    if (draggedRecipeIndex === null || draggedRecipeIndex === index) return;
    const newRecipes = [...recipes];
    const draggedItem = newRecipes.splice(draggedRecipeIndex, 1)[0];
    newRecipes.splice(index, 0, draggedItem);
    const updated = newRecipes.map((r, i) => ({ ...r, display_order: i }));
    setRecipes(updated);
    setDraggedRecipeIndex(null);
    await supabase.from('recipes').upsert(updated.map(r => ({ id: r.id, display_order: r.display_order })));
  };

  // גרירת קטגוריות מתכונים
  const onRecipeCatDragStart = (index) => { setDraggedRecipeCatIndex(index); };
  const onRecipeCatDrop = async (index) => {
  if (draggedRecipeCatIndex === null || draggedRecipeCatIndex === index) return;
  
  const newCats = [...recipeCats];
  const draggedItem = newCats.splice(draggedRecipeCatIndex, 1)[0];
  newCats.splice(index, 0, draggedItem);
  
  // יצירת מערך מעודכן שבו לכל קטגוריה יש display_order לפי המיקום החדש שלה
  const updated = newCats.map((c, i) => ({
    ...c,
    display_order: i
  }));
  
  // עדכון ה-State המקומי כדי שהשינוי יראה מיד בעין
  setRecipeCats(updated);
  setDraggedRecipeCatIndex(null);

  // שמירה ב-Supabase - שליחת כל האובייקטים המעודכנים
  const { error } = await supabase
    .from('recipe_categories')
    .upsert(updated);

  if (error) {
    console.error("שגיאה בשמירת הסדר:", error.message);
    alert("הסדר לא נשמר בשרת: " + error.message);
  }
};




  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const catData = {
      name: formData.get('name'),
      slug: editingCategory ? editingCategory.slug : `cat_${Date.now()}`,
      icon: formData.get('icon'),
      display_order: Number(formData.get('display_order')),
      is_visible: formData.get('is_visible') === 'on'
    };

    if (editingCategory) {
      await supabase.from('categories').update(catData).eq('id', editingCategory.id);
    } else {
      await supabase.from('categories').insert([catData]);
    }
    setEditingCategory(null);
    await fetchCategories();
  };

  const startDeleteCategory = (cat) => {
    const productsInCat = products.filter(p => p.category === cat.slug);
    setCategoryToDelete(cat);
    if (productsInCat.length > 0) {
      setShowDeleteCategoryModal(true);
      setMoveProductsTo("");
    } else {
      if (window.confirm(`למחוק את קטגוריית ${cat.name}?`)) {
        confirmDeleteCategory(cat.id, cat.slug, null);
      }
    }
  };

  const confirmDeleteCategory = async (id, oldSlug, newSlug) => {
    if (newSlug === "DELETE_ALL") {
      if (window.confirm("⚠️ זהירות! פעולה זו תמחק את כל המוצרים שמשויכים לקטגוריה זו. להמשיך?")) {
        await supabase.from('products').delete().eq('category', oldSlug);
      } else { return; }
    } else if (newSlug) {
      await supabase.from('products').update({ category: newSlug }).eq('category', oldSlug);
    }

    await supabase.from('categories').delete().eq('id', id);
    setShowDeleteCategoryModal(false);
    setCategoryToDelete(null);
    await Promise.all([fetchCategories(), fetchProducts()]);
  };

  const nextCatOrder = categories.length > 0 ? Math.max(...categories.map(c => c.display_order)) + 1 : 1;

  const totalPastriesInCart = products
    .filter(p => p.category === 'pastries' || !p.category)
    .reduce((sum, p) => sum + (cart[p.id] || 0), 0);

    const getNextFairDateObj = () => {
    const now = new Date();
    const fairDays = siteSettings.fair_days || [3];
    const openHourStr = siteSettings.opening_hour || "12:00";
    const [h, m] = openHourStr.split(':').map(Number);

    let upcomingDates = fairDays.map(day => {
        let daysUntil = (day - now.getDay() + 7) % 7;
        
        // אם היום הוא יום יריד, נבדוק אם שעת הפתיחה כבר עברה
        if (daysUntil === 0) {
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const openMinutes = h * 60 + m;
            if (currentMinutes >= openMinutes) {
                daysUntil = 7; // היריד של היום כבר נפתח/עבר, עוברים לשבוע הבא
            }
        }
        
        const d = new Date();
        d.setDate(now.getDate() + daysUntil);
        d.setHours(h, m, 0, 0);
        return d;
    }).sort((a,b) => a - b);

    return upcomingDates[0];
  };


  const getCalendarUrl = () => {
    const targetDate = getNextFairDateObj();
    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '').split('.')[0] + "Z";
    const start = formatDate(targetDate);
    const end = formatDate(new Date(targetDate.getTime() + 60 * 60 * 1000));

    // שליפת ימי היריד
    const fairDays = siteSettings.fair_days || [3];
    const firstDayValue = Math.min(...fairDays);
    const lastDayValue = Math.max(...fairDays);
    
    // הגדרת שמות הימים (אם יש רק יום אחד, שניהם יהיו אותו יום)
    const firstDayLabel = daysOfWeek.find(d => d.value === firstDayValue)?.label || "רביעי";
    const secondDayLabel = daysOfWeek.find(d => d.value === lastDayValue)?.label || firstDayLabel;
    
    const openHour = siteSettings.opening_hour || "12:00";
    const brandName = siteSettings.reminder_brand_name || "ליאור בן משה";

    // בניית הכותרת לפי הנוסח החדש שביקשת
    const titleText = `לבצע הזמנה מהאתר של ${brandName} החל מהשעה ${openHour} ביום ${firstDayLabel} לאיסוף מ${siteSettings.main_title} ביום ${secondDayLabel}`;
    
    const title = encodeURIComponent(titleText);
    const details = encodeURIComponent(`לינק להזמנה מהאתר: ${window.location.href}`);

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&sf=true&output=xml`;
  };



  const openSourceModal = (tf) => {
    setSourceTimeframe(tf);
    setShowSourceModal(true);
  };

const handleRandomizer = (overrideBudget = null) => {
    const finalBudget = (overrideBudget && typeof overrideBudget === 'number') ? overrideBudget : Number(budget);
    if (!finalBudget || finalBudget <= 0) return;

    setLastRandomBudget(finalBudget);

    const availableProducts = products.filter(p => p.is_visible && !p.is_sold_out && (!filterGF || p.is_gluten_free));

    // תיקון: מתחילים תמיד מהסל שהיה לפני הרנדום, לא מהסל הנוכחי המלא
    let tempCart = { ...cartBeforeRandom };

    const calculateCurrentTotal = (currentCart) => {
      return Object.entries(currentCart).reduce((sum, [key, qty]) => {
        const [idStr] = key.split('__');
        const p = products.find(prod => prod.id === Number(idStr));
        return sum + (p ? p.price * qty : 0);
      }, 0);
    };

    let currentTotal = calculateCurrentTotal(tempCart);

    // אם במקרה הסל הידני כבר עובר את התקציב, אין מה להשלים
    if (currentTotal >= finalBudget) {
      setCart(tempCart); // משאירים את מה שהיה
      setShowRandomizerModal(false);
      setBudget("");
      return;
    }

    const getRandKey = (p) => (p.variants && p.variants.length > 0) ? `${p.id}__${p.variants[Math.floor(Math.random() * p.variants.length)]}` : `${p.id}`;

    // שלב א': הבטחת מוצר אחד מכל קטגוריה (אם עדיין אין כזה בסל)
    categories.forEach(cat => {
      const hasFromCat = Object.keys(tempCart).some(key => {
        const [id] = key.split('__');
        const p = products.find(prod => prod.id === Number(id));
        return p && p.category === cat.slug;
      });

      if (!hasFromCat) {
        const catPool = availableProducts.filter(p => p.category === cat.slug);
        if (catPool.length > 0) {
          const picked = catPool[Math.floor(Math.random() * catPool.length)];
          if (currentTotal + picked.price <= finalBudget) {
            const key = getRandKey(picked);
            tempCart[key] = (tempCart[key] || 0) + 1;
            currentTotal += picked.price;
          }
        }
      }
    });

    // שלב ב': מילוי שאר התקציב עם הגבלה של 3 יחידות למוצר
    const generalPool = [...availableProducts].sort(() => 0.5 - Math.random());
    let addedAny = true;
    while (addedAny && currentTotal < finalBudget) {
      addedAny = false;
      for (const p of generalPool) {
        const key = getRandKey(p);
        const currentQty = tempCart[key] || 0;
        const limit = finalBudget > 500 ? 10 : 3; 

        if (currentQty < limit && currentTotal + p.price <= finalBudget) {
          tempCart[key] = currentQty + 1;
          currentTotal += p.price;
          addedAny = true;
        }
      }
    }

    // שלב ג': הבטחת מספר מאפים זוגי (בלי לחרוג מהתקציב!)
    const getPastryCount = (currentCart) => {
      return Object.entries(currentCart).reduce((sum, [key, qty]) => {
        const [idStr] = key.split('__');
        const p = products.find(prod => prod.id === Number(idStr));
        if (p && (p.category === 'pastries' || !p.category)) return sum + qty;
        return sum;
      }, 0);
    };

    let pastryCount = getPastryCount(tempCart);
    if (pastryCount % 2 !== 0) {
      // 1. ננסה למצוא את המאפה הכי זול שקיים במלאי
      const cheapPastry = availableProducts
        .filter(p => p.category === 'pastries' || !p.category)
        .sort((a, b) => a.price - b.price)[0];

      // 2. נבדוק אם הוספה שלו עדיין עומדת בתקציב
      if (cheapPastry && calculateCurrentTotal(tempCart) + cheapPastry.price <= finalBudget) {
        const key = getRandKey(cheapPastry);
        tempCart[key] = (tempCart[key] || 0) + 1;
      } else {
        // 3. אם אין תקציב להוסיף, נסיר מאפה אחד כדי להגיע למספר זוגי
        const keysInCart = Object.keys(tempCart).filter(k => {
          const [id] = k.split('__');
          const p = products.find(prod => prod.id === Number(id));
          return p && (p.category === 'pastries' || !p.category);
        });

        if (keysInCart.length > 0) {
          const keyToRemove = keysInCart[0];
          if (tempCart[keyToRemove] > 1) tempCart[keyToRemove]--;
          else delete tempCart[keyToRemove];
        }
      }
    }

    setCart(tempCart);
    setShowRandomizerModal(false);
    setBudget("");
  };




  const handleResetGoldenCounter = async () => {
    if (window.confirm("לאפס את מונה המאפה המוזהב?")) {
      await supabase.from('settings').update({ golden_pastry_counter: 0 }).eq('id', 1);
      fetchSettings();
    }
  };
  // בדיקה האם אחת מהחלוניות פתוחה כרגע (כולל חלוניות ניהול)
  const isAnyModalOpen = 
    showWelcomePopup || showRecipesModal || selectedRecipe || 
    showCartSummaryModal || showPickupModal || showVariantModal || 
    showStatsModal || showSettingsModal || showExtraSettingsModal || 
    showPendingOrdersModal || showNavModal || showSaleModal || 
    showGoldenModal || showThankYouModal || showRandomizerModal || 
    previewImage || showLoginModal || showDayWarning || 
    showEmptyCartModal || showDiscountModal || showAlreadyActiveModal ||
    showSaveConfirm || showAddItemModal || showCategoryManager || 
    showDeleteCategoryModal || showRecipeFormModal || showRecipeCatManager || 
    showSaleStockModal;

  return (
    <div className={`min-h-screen text-white text-right scroll-smooth ${isSaleActiveNow && !isAdmin ? 'bg-transparent' : 'bg-[#0f172a]'}`} dir="rtl">

        {/* שכבת להבות וניצוצות - מופיע רק בזמן מבצע */}
      {isSaleActiveNow && !isAdmin && (
        <div className="sale-fire-container">
          <div className="fire-glow-base" />
          <div className="fire-glow-base" style={{ animationDelay: '2s', height: '400px', bottom: '-100px', opacity: 0.5 }} />

          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="spark" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }} 
            />
          ))}
        </div>
      )}
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800;900&display=swap');
/* --- אנימציית רקע לוהט - שכבה תחתונה בלבד --- */
@keyframes arrow-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
.animate-pulse-green { animation: pulse-green 2s infinite; }

/* אנימציות החלקה פנימה */
@keyframes slideInFromRight {
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
@keyframes slideInFromLeft {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.animate-slide-right {
  animation: slideInFromRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-slide-left {
  animation: slideInFromLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes arrow-glow-green {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.6)); }
  50% { filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.9)); }
}

@keyframes fire-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
@keyframes sun-pulse {
  0% { transform: scale(1); box-shadow: 0 0 10px #f59e0b; }
  50% { transform: scale(1.1); box-shadow: 0 0 25px #fbbf24, 0 0 40px #f59e0b; }
  100% { transform: scale(1); box-shadow: 0 0 10px #f59e0b; }
}
.animate-sun { animation: sun-pulse 2s infinite ease-in-out; }

.sale-fire-container {
  position: fixed;
  inset: 0;
  z-index: -9999; /* יושב מאחורי התוכן */
  background-color: #0f172a; 
  overflow: hidden;
  pointer-events: none;
}

.fire-glow-base {
  position: absolute;
  bottom: -150px;
  left: 0;
  right: 0;
  height: 600px;
  background: radial-gradient(circle at 50% 100%, #991b1b 0%, #450a0a 40%, transparent 80%);
  filter: blur(60px);
  animation: fire-pulse 4s infinite ease-in-out;
}

@keyframes sparks-fly {
  0% { transform: translateY(0) translateX(0); opacity: 1; }
  100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
}

.spark {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 2px;
  background: #f59e0b;
  border-radius: 50%;
  animation: sparks-fly 3s linear infinite;
}

        * { font-family: 'Heebo', sans-serif !important; }
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 20%, 100% { transform: translateX(150%) skewX(-20deg); } }
        .shimmer-effect { position: relative; overflow: hidden; }
        .shimmer-effect::after { content: ""; position: absolute; top: 0; left: 0; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent); animation: shimmer 5s infinite; }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.2); } 50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.5); } }
        .glow-active { animation: glow 1s ease-in-out; }
        @keyframes wobble { 0%, 100% { transform: rotate(0deg); } 15% { transform: rotate(8deg); } 30% { transform: rotate(-8deg); } 45% { transform: rotate(5deg); } 60% { transform: rotate(-5deg); } 75% { transform: rotate(2deg); } }
        .animate-wobble { animation: wobble 0.5s ease-in-out infinite; }
        .dragging { opacity: 0.5 !important; background: #1e293b !important; border: 2px dashed #f59e0b !important; scale: 0.98; }
        .fade-out { opacity: 0; transition: opacity 0.5s ease; }
        @keyframes confetti-fall { 
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; } 
          100% { transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(0); opacity: 0; } 
        }
        .confetti-new { position: absolute; border-radius: 2px; animation: confetti-fall 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        @keyframes pulse-reminder {
          0%, 5% { transform: scale(1); }
          10% { transform: scale(1.15); }
          15% { transform: scale(1); }
          20% { transform: scale(1.15); }
          25%, 100% { transform: scale(1); }
        }
        .animate-pulse-reminder { animation: pulse-reminder 2s infinite ease-in-out; }
        @keyframes slide-up-proof {
          0% { transform: translateY(100%) translateX(-50%); opacity: 0; }
          15% { transform: translateY(-20px) translateX(-50%); opacity: 1; }
          85% { transform: translateY(-20px) translateX(-50%); opacity: 1; }
          100% { transform: translateY(100%) translateX(-50%); opacity: 0; }
        }
       @keyframes pulse-soft {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2); }
  50% { transform: scale(1.02); box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.3); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2); }
}
.animate-pulse-soft {
  animation: pulse-soft 3s infinite ease-in-out;
}

        .animate-social-proof { animation: slide-up-proof 6s ease-in-out forwards; }
      `}</style>

      {loading && (
        <div className={`fixed inset-0 z-[1000] bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center ${fadeLoading ? 'fade-out' : ''}`}>
         <img src={siteSettings.logo_url} className="w-48 md:w-64 animate-pulse" alt="Logo" />
          <h2 className="text-amber-500 font-black text-3xl mb-2 text-center">ברוכים הבאים</h2>
          <p className="text-slate-400 font-bold text-lg tracking-widest text-center">אנא המתינו</p>
        </div>
      )}

{socialProof && (
  <div 
onClick={(e) => {
      e.stopPropagation();
      if (socialProof.isUrgent) {
        setUrgentDismissed(true); // חוסם את ההודעה לגמרי עד הרענון הבא
        setIsUrgentActive(false); // מחזיר את השמש למעלה מיד
      } 
 else if (socialProof.isOrder) {
        setDismissedOrderId(socialProof.id.toString());
      } else {
        setFomoDismissed(true);
      }
      setSocialProof(null);
    }}

    className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[800] w-full max-w-[260px] px-4 animate-social-proof cursor-pointer pointer-events-auto"
  >
    <div className={`backdrop-blur-md py-1 px-2.5 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center gap-1.5 border transition-all active:scale-95 
      ${socialProof.isUrgent ? 'bg-red-600/95 border-white/50' : 
        socialProof.isFomo ? 'bg-amber-600/95 border-white/40' : 'bg-slate-900/90 border-amber-500/50'}`}>

       {/* אייקון מוקטן */}
       <div className={`${(socialProof.isUrgent || socialProof.isFomo) ? 'bg-white text-amber-600' : 'bg-amber-500 text-[#0f172a]'} p-0.5 rounded-full shadow-lg shrink-0`}>
          {socialProof.isUrgent ? <BellRing size={12} className="animate-bounce" /> : 
           socialProof.isFomo ? <Zap size={12} className="animate-pulse" /> : <ShoppingBag size={12} />}
       </div>

       <div className="text-right flex-1 min-w-0">
          <p className="text-[11px] font-bold text-white leading-[1.1] whitespace-pre-line">
            {socialProof.isUrgent ? (
              <>עדכון: {socialProof.main_item}</>
            ) : socialProof.isFomo ? (
              <span className="text-white">{socialProof.main_item}</span>
            ) : (
              <>
                <span className="text-amber-400">{(socialProof.customer_name || "").split(' ')[0]}</span>
                {" "}הזמין/ה: {socialProof.main_item}
              </>
            )}
          </p>
          <p className="text-[7px] text-white/40 mt-0 font-medium uppercase tracking-tighter">לחץ להסתרה עד לריענון</p>
       </div>
    </div>
  </div>
)}



      <div className="h-1.5 bg-gradient-to-l from-amber-600 to-yellow-400"></div>

      {isAdmin ? (
        <div className="p-4 max-w-2xl mx-auto animate-in fade-in pb-32 text-right">
          <div className="flex justify-between items-center mb-8 text-right">
            <h1 className="text-2xl font-black text-amber-500 flex items-center gap-2 text-right"><LayoutDashboard /> ניהול</h1>
            <button onClick={() => setIsAdmin(false)} className="bg-slate-800 text-slate-400 px-4 py-2 rounded-full font-bold text-xs text-center">יציאה</button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8 text-center px-1">
<button 
  onClick={() => { 
    setSettingsSnapshot(JSON.parse(JSON.stringify(siteSettings))); 
    setShowSettingsModal(true); 
  }} 
  className="bg-slate-800 border border-slate-700 py-4 px-1 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all shadow-xl text-center"
>
  <Settings className="text-amber-500" size={20} />
  <span className="font-black text-[11px] text-center">הגדרות אתר</span>
</button>

             <button onClick={() => { setSettingsSnapshot(JSON.parse(JSON.stringify(siteSettings))); setShowExtraSettingsModal(true); }} className="bg-slate-800 border border-slate-700 py-4 px-1 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all shadow-xl text-center">
                <Edit2 className="text-green-400" size={20} />
                <span className="font-black text-[11px] text-center">עריכה אישית</span>
             </button>
             <button onClick={() => { fetchVisits(); setShowStatsModal(true); }} className="bg-slate-800 border border-slate-700 py-4 px-1 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all shadow-xl text-center">
                <BarChart3 className="text-blue-400" size={20} />
                <span className="font-black text-[11px] text-center">סטטיסטיקה</span>
             </button>
             <button onClick={() => setShowCategoryManager(true)} className="bg-slate-800 border border-slate-700 py-4 px-1 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all shadow-xl text-center">
                <Layers className="text-purple-400" size={20} />
                <span className="font-black text-[11px] text-center">קטגוריות</span>
             </button>
             <button onClick={() => setShowRecipeManager(true)} className="bg-slate-800 border border-slate-700 py-4 px-1 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all shadow-xl text-center">
                <BookOpen className="text-pink-400" size={20} />
                <span className="font-black text-[11px] text-center">מתכונים</span>
             </button>
            <button 
              onClick={() => { 
                setEditingProduct(null); 
                setFormCategory('pastries'); 
                setTempVariants([]); 
                setShowAddItemModal(true); 
              }} 
              className="bg-amber-600 py-4 px-1 rounded-2xl flex flex-col items-center gap-2 hover:bg-amber-500 transition-all shadow-xl text-center"
            >
              <PlusCircle className="text-white" size={20} />
              <span className="font-black text-[11px] text-white text-center">הוספה</span>
            </button>
          </div>



          <div className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md pt-2 pb-4">
            <div className="relative mb-4">
              <Search className="absolute right-4 top-3.5 text-amber-500/50" size={18} />
              <input type="text" placeholder="חיפוש מוצר..." className="w-full bg-slate-900 border border-slate-700 p-3 pr-11 rounded-2xl text-right text-white outline-none focus:border-amber-500 font-bold" value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} />
            </div>
            {/* תצוגת תוצאות חיפוש מהירה */}
{adminSearch.trim() !== "" && (
  <div className="mb-8 animate-in fade-in slide-in-from-top-2">
    <h3 className="text-amber-500 font-black text-xs mb-3 pr-2 flex items-center gap-2">
      <Search size={14} /> תוצאות חיפוש ל-"{adminSearch}"
    </h3>
    <div className="space-y-2">
      {products.filter(p => p.name.toLowerCase().includes(adminSearch.toLowerCase())).map((p) => (
        <div key={p.id} className="p-3 rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-slate-900" />
            <div className="flex flex-col text-right">
              <span className="font-bold text-xs text-white">{p.name}</span>
              <span className="text-[10px] text-amber-500">₪{p.price}</span>
            </div>
          </div>
          <button 
            onClick={() => { setEditingProduct(p); setFormCategory(p.category || 'pastries'); setShowAddItemModal(true); }}
            className="p-2 bg-amber-600 text-[#0f172a] rounded-xl font-black text-[10px]"
          >
            ערוך מוצר
          </button>
        </div>
      ))}
      {products.filter(p => p.name.toLowerCase().includes(adminSearch.toLowerCase())).length === 0 && (
        <p className="text-center text-slate-500 text-xs py-4">לא נמצאו מוצרים תואמים</p>
      )}
    </div>
    <div className="h-[1px] bg-slate-800 my-6 w-full"></div>
  </div>
)}

<div className="grid grid-cols-3 gap-2 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 mb-6">
    {categories.map(c => (
      <button 
        key={c.id} 
        onClick={() => setActiveAdminCatModal(c)} 
        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl flex flex-col items-center gap-3 transition-all active:scale-95 shadow-lg min-h-[110px]"
      >
        <span className="text-sm">{c.icon}</span>
        <span className="text-sm font-black text-amber-500 uppercase tracking-tight">{c.name}</span>
      </button>
    ))}
</div>

          </div>

{/* חלונית מוצרים לפי קטגוריה */}
{activeAdminCatModal && (
  <div className="fixed inset-0 z-[600] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-amber-500 p-6 rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-slate-900 z-10 pb-4 border-b border-slate-800">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          {activeAdminCatModal.icon} ניהול {activeAdminCatModal.name}
        </h3>
        <button onClick={() => setActiveAdminCatModal(null)} className="text-slate-500 hover:text-white"><X size={24}/></button>
      </div>

      <div className="space-y-3">
        {products.filter(p => (p.category === activeAdminCatModal.slug || (!p.category && activeAdminCatModal.slug === 'pastries')) && p.name.includes(adminSearch)).map((p) => {
          const globalIndex = products.findIndex(item => item.id === p.id);
          return (
            <div key={p.id} draggable={!adminSearch} onDragStart={() => onDragStart(globalIndex)} onDragOver={onDragOver} onDrop={() => onDrop(globalIndex)}
              className={`p-3 rounded-2xl border-2 flex justify-between items-center transition-all ${draggedItemIndex === globalIndex ? 'dragging' : ''} ${p.is_sold_out ? 'bg-slate-900 grayscale opacity-40' : p.is_visible ? 'bg-slate-800/40 border-slate-700' : 'bg-red-900/10 border-red-500/20'}`}>
              <div className="flex items-center gap-3">
                <GripVertical className="text-slate-700 cursor-grab" size={18} />
                <img src={p.image} className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-700" />
                <div className="flex flex-col text-right">
                  <span className="font-bold text-xs">{p.name} {p.is_gluten_free && "🌾"}</span>
                  <span className="text-[9px] font-bold text-amber-500/70">₪{p.price}</span>
                </div>
              </div>
              <div className="flex gap-1.5 items-center">
                <button onClick={() => toggleSoldOut(p)} className={`px-3 py-1.5 rounded-full text-[9px] font-black ${p.is_sold_out ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'}`}>אזל</button>
                <button onClick={() => toggleFomo(p)} className={`px-3 py-1.5 rounded-full text-[9px] font-black ${p.is_fomo ? 'bg-amber-500 text-[#0f172a] animate-pulse' : 'bg-slate-700 text-slate-300'}`}>fomo</button>
                <button onClick={() => { setEditingProduct(p); setFormCategory(p.category || 'pastries'); setTempVariants(p.variants?.map(vName => ({ name: vName, stock: p.variant_stock?.[vName] ?? "" })) || []); setShowAddItemModal(true); }} className="p-2 bg-blue-600/20 text-blue-400 rounded-xl"><Edit2 size={14}/></button>
                <button onClick={() => toggleVisible(p)} className={`p-2 rounded-xl ${p.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>{p.is_visible ? <Eye size={14}/> : <EyeOff size={14}/>}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}

          {/* Category Management Modal */}
          {showCategoryManager && (
            <div className="fixed inset-0 z-[600] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
              <div className="bg-slate-900 border-2 border-purple-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-2"><Layers className="text-purple-400" /> ניהול קטגוריות</h3>
                  <button onClick={() => setShowCategoryManager(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                </div>

                <form onSubmit={handleSaveCategory} className="space-y-4 mb-8 bg-slate-800/50 p-4 rounded-3xl border border-slate-700">
                  <div className="grid grid-cols-1 gap-3">
                    <input name="name" className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-center text-sm font-bold outline-none focus:border-purple-500" placeholder="שם קטגוריה" defaultValue={editingCategory?.name || ''} required />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input name="icon" className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-center text-lg outline-none focus:border-purple-500" placeholder="אימוג'י" defaultValue={editingCategory?.icon || ''} required />
                    <input name="display_order" type="number" readOnly className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl text-center text-sm font-bold text-slate-500 outline-none" placeholder="סדר" value={editingCategory ? editingCategory.display_order : nextCatOrder} />
                    <div className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 rounded-xl p-2">
                      <span className="text-[10px] font-bold text-slate-400">מוצג?</span>
                      <input name="is_visible" type="checkbox" className="accent-purple-500 w-4 h-4" defaultChecked={editingCategory ? editingCategory.is_visible : true} />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-black shadow-lg hover:bg-purple-500 transition-all">{editingCategory ? 'עדכן קטגוריה' : 'הוסף קטגוריה חדשה'}</button>
                  {editingCategory && <button type="button" onClick={() => setEditingCategory(null)} className="w-full text-slate-500 text-xs font-bold py-1">ביטול עריכה</button>}
                </form>

                <div className="space-y-2">
                  <p className="text-[10px] text-center text-slate-500 mb-2 font-bold">ניתן לגרור קטגוריות כדי לשנות את סדרן</p>
                  {categories.map((cat, idx) => (
                    <div key={cat.id} 
                         draggable 
                         onDragStart={() => onCatDragStart(idx)} 
                         onDragOver={(e) => e.preventDefault()} 
                         onDrop={() => onCatDrop(idx)}
                         className={`bg-slate-800/40 p-3 rounded-2xl flex items-center justify-between border border-slate-700/50 transition-all ${draggedCatIndex === idx ? 'dragging' : ''}`}>
                      <div className="flex items-center gap-3">
                        <GripVertical className="text-slate-700 cursor-grab" size={18} />
                        <span className="text-xl">{cat.icon}</span>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{cat.name} {!cat.is_visible && <EyeOff size={10} className="inline text-red-400" />}</span>
                          <span className="text-[10px] text-slate-500">סדר: {cat.display_order}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingCategory(cat)} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={14}/></button>
                        <button onClick={() => startDeleteCategory(cat)} className="p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recipe Manager Modal (Admin) - גלילה אחידה לכל החלונית */}
          {showRecipeManager && (
            <div className="fixed inset-0 z-[600] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
              <div className="bg-slate-900 border-2 border-pink-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-2"><BookOpen className="text-pink-400" /> ניהול מתכונים</h3>
                  <button onClick={() => setShowRecipeManager(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                </div>

                {/* כפתורי פעולה למנהל */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                   <button 
                      onClick={() => { setEditingRecipe(null); setShowRecipeFormModal(true); }}
                      className="bg-pink-600 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                   >
                      <Plus size={18} /> מתכון חדש
                   </button>
                   <button 
                      onClick={() => setShowRecipeCatManager(true)}
                      className="bg-slate-800 border border-slate-700 text-slate-300 py-3 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                   >
                      <Layers size={18} /> קטגוריות
                   </button>
                </div>

                <div className="space-y-6 pb-4">
                  <p className="text-[10px] text-center text-slate-500 font-bold">ניתן לגרור מתכונים לשינוי סדר התצוגה</p>
                  
                  {/* לולאה על הקטגוריות כדי להציג מתכונים בנפרד */}
                  {[...recipeCats, { id: 'uncategorized', name: 'ללא קטגוריה', slug: 'all' }].map((cat) => {
                    // סינון המתכונים ששייכים לקטגוריה הזו
                    const catRecipes = recipes.filter(r => 
                       cat.id === 'uncategorized' 
                       ? (!r.category_slug || r.category_slug === 'all') 
                       : r.category_slug === cat.slug
                    );

                    if (catRecipes.length === 0) return null;

                    return (
                      <div key={cat.id} className="bg-slate-800/30 p-3 rounded-3xl border border-slate-700/50">
                        <h4 className="text-pink-400 font-black text-xs mb-3 pr-2 flex items-center gap-2">
                           <Layers size={12}/> {cat.name}
                        </h4>
                        <div className="space-y-2">
                          {catRecipes.map((r) => {
                            // מציאת האינדקס האמיתי ברשימה הכללית לצורך גרירה תקינה
                            const globalIndex = recipes.findIndex(item => item.id === r.id);
                            
                            return (
                              <div 
                                  key={r.id} 
                                  draggable 
                                  onDragStart={() => onRecipeDragStart(globalIndex)} 
                                  onDragOver={(e) => e.preventDefault()} 
                                  onDrop={() => onRecipeDrop(globalIndex)}
                                  className={`bg-slate-900 p-2 rounded-2xl flex items-center justify-between border border-slate-700 transition-all ${draggedRecipeIndex === globalIndex ? 'opacity-50 border-pink-500 border-dashed' : ''}`}
                              >
                                <div className="flex items-center gap-3 overflow-hidden">
                                   <GripVertical className="text-slate-600 cursor-grab hover:text-slate-400 shrink-0" size={18} />
                                   <img src={r.image} className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0" />
                                   <span className="font-bold text-sm text-white truncate">{r.title}</span>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                  <button onClick={() => { setEditingRecipe(r); setShowRecipeFormModal(true); }} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={14}/></button>
                                  <button onClick={() => deleteRecipe(r.id)} className="p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14}/></button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  
                  {recipes.length === 0 && <p className="text-center text-slate-500 text-xs mt-4">אין מתכונים כרגע</p>}
                </div>

              </div>
            </div>
          )}

          {/* מודל הוספה/עריכת מתכון */}
          {showRecipeFormModal && (
            <div className="fixed inset-0 z-[700] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in zoom-in">
              <div className="bg-slate-900 border-2 border-pink-500 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full">
                <h3 className="text-xl font-black text-white text-center mb-6">{editingRecipe ? 'עריכת מתכון' : 'מתכון חדש'}</h3>
                <form onSubmit={handleSaveRecipe} className="space-y-4">
                  <input name="title" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-center font-bold text-white" placeholder="כותרת המתכון" defaultValue={editingRecipe?.title} required />
                  
                  {/* שדה חדש: שם הכותב */}
                  <input name="author_name" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-center font-bold text-amber-500 placeholder:text-slate-600" placeholder="שם כותב המתכון (אופציונלי)" defaultValue={editingRecipe?.author_name} />

                  <input name="image" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-center text-white" placeholder="URL תמונה" defaultValue={editingRecipe?.image} required />
                  <select name="category_slug" className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-center font-bold text-pink-400 outline-none" defaultValue={editingRecipe?.category_slug || 'all'}>
                    <option value="all">בחר קטגוריה...</option>
                    {recipeCats.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                  <textarea name="content" rows={6} className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-right text-white" placeholder="תוכן המתכון..." defaultValue={editingRecipe?.content} required />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-black">שמור</button>
                    <button type="button" onClick={() => setShowRecipeFormModal(false)} className="flex-1 bg-slate-700 text-slate-300 py-3 rounded-xl font-bold">ביטול</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* מודל ניהול קטגוריות מתכונים */}
          {showRecipeCatManager && (
            <div className="fixed inset-0 z-[700] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in zoom-in">
              <div className="bg-slate-900 border-2 border-pink-500 p-6 rounded-[2.5rem] shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-black text-white text-center mb-6">קטגוריות מתכונים</h3>
                <form onSubmit={handleSaveRecipeCat} className="mb-6 space-y-2">
                   <h4 className="text-center text-sm font-bold text-slate-400">
                      {editingRecipeCat ? 'עריכת שם קטגוריה' : 'הוספת קטגוריה חדשה'}
                   </h4>
                   <div className="flex gap-2">
                       <input 
                         // ה-key הזה קריטי כדי שהשם יתעדכן כשלוחצים על עריכה
                         key={editingRecipeCat ? editingRecipeCat.id : 'new'}
                         name="name" 
                         className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-center text-white font-bold outline-none focus:border-pink-500" 
                         placeholder="שם הקטגוריה" 
                         defaultValue={editingRecipeCat?.name || ''} 
                         required 
                       />
                       {editingRecipeCat && (
                         <button 
                           type="button" 
                           onClick={() => setEditingRecipeCat(null)} 
                           className="bg-slate-700 text-slate-300 px-4 rounded-xl font-bold"
                         >
                           ביטול
                         </button>
                       )}
                   </div>
                   <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-xl font-black shadow-lg">
                      {editingRecipeCat ? 'עדכן שמירה' : 'הוסף קטגוריה'}
                   </button>
                </form>

                <div className="space-y-2">
                  {recipeCats.map((c, idx) => (
                    <div key={c.id} draggable onDragStart={() => onRecipeCatDragStart(idx)} onDragOver={(e) => e.preventDefault()} onDrop={() => onRecipeCatDrop(idx)}
                         className="bg-slate-800 p-3 rounded-xl flex items-center justify-between border border-slate-700">
                       <div className="flex items-center gap-2">
                          <GripVertical size={16} className="text-slate-600" />
                          <span className="text-white font-bold">{c.name}</span>
                       </div>
                       <div className="flex gap-1">
                          <button onClick={() => setEditingRecipeCat(c)} className="p-1.5 text-blue-400"><Edit2 size={14}/></button>
                          <button onClick={async () => { if(window.confirm("למחוק?")) { await supabase.from('recipe_categories').delete().eq('id', c.id); fetchRecipeCats(); } }} className="p-1.5 text-red-400"><Trash2 size={14}/></button>
                       </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowRecipeCatManager(false)} className="w-full mt-6 text-slate-500 font-bold">סגור</button>
              </div>
            </div>
          )}


          {/* Delete Category Confirmation with Product Migration or Auto-Deletion */}
          {showDeleteCategoryModal && (
            <div className="fixed inset-0 z-[700] flex items-center justify-center px-4 bg-black/95 backdrop-blur-md">
              <div className="bg-slate-900 border-2 border-red-500 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                <h3 className="text-xl font-black mb-2 text-white">מחיקת קטגוריית "{categoryToDelete?.name}"</h3>
                <p className="text-slate-400 text-sm mb-6">מה תרצה לעשות עם המוצרים שבתוך הקטגוריה?</p>

                <select 
                  className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white font-bold outline-none mb-6 text-center"
                  value={moveProductsTo}
                  onChange={(e) => setMoveProductsTo(e.target.value)}
                >
                  <option value="">בחר אפשרות...</option>
                  <option value="DELETE_ALL" className="text-red-500">❌ מחק את כל המוצרים בקטגוריה אוטומטית</option>
                  {categories.filter(c => c.id !== categoryToDelete?.id).map(c => (
                    <option key={c.id} value={c.slug}>העבר מוצרים לקטגוריה: {c.name}</option>
                  ))}
                </select>

                <div className="flex flex-col gap-3">
                  <button 
                    disabled={!moveProductsTo}
                    onClick={() => confirmDeleteCategory(categoryToDelete.id, categoryToDelete.slug, moveProductsTo)} 
                    className={`w-full py-4 rounded-full font-black text-lg transition-all ${moveProductsTo === 'DELETE_ALL' ? 'bg-red-600 text-white animate-pulse' : moveProductsTo ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-600'}`}
                  >
                    {moveProductsTo === 'DELETE_ALL' ? 'מחק הכל לצמיתות!' : 'בצע ומחק קטגוריה'}
                  </button>
                  <button onClick={() => {setShowDeleteCategoryModal(false); setCategoryToDelete(null);}} className="w-full bg-slate-700 text-white py-3 rounded-full font-bold">ביטול</button>
                </div>
              </div>
            </div>
          )}

          {showStatsModal && (
            <div className="fixed inset-0 z-[600] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl animate-in fade-in text-right">
              <div className="bg-slate-900 border-2 border-blue-500 p-6 rounded-[2.5rem] shadow-2xl max-md w-full animate-in zoom-in overflow-y-auto max-h-[85vh] text-right">
                <div className="flex justify-between items-center mb-6 text-right">
                  <h3 className="text-xl font-black text-white flex items-center gap-2 text-center w-full text-right"><BarChart3 className="text-blue-400" /> סטטיסטיקה</h3>
                  <button onClick={() => setShowStatsModal(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                </div>
               
               {/* כרטיס גולשים באתר כרגע */}
<div className="bg-green-600/10 border-2 border-green-500/30 p-4 rounded-3xl mb-4 flex items-center justify-between transition-all">
 <div className="flex items-center gap-3">
    {/* כפתור ירוק מהבהב */}
    <div className="relative">
      <div className="bg-green-500 p-2 rounded-full text-white shadow-lg animate-pulse-green">
        <Users size={20} />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
    </div>
    <div className="text-right">
      <div className="text-[10px] font-black text-green-400 uppercase tracking-tighter">גולשים כרגע באתר</div>
      <div className="text-2xl font-black text-white leading-none">{onlineUsers}</div>
    </div>
  </div>
</div>


                <div className="mb-8 text-center grid grid-cols-1 md:grid-cols-2 gap-4">
<button onClick={() => setShowVisitsModal(true)} 
                  className="bg-blue-600/10 border-2 border-blue-500/30 p-4 rounded-3xl flex items-center justify-between hover:bg-blue-600/20 transition-all active:scale-[0.98] text-center"
                  >
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-2 rounded-full text-white shadow-lg text-center"><Users size={20} /></div>
                        <div className="text-right">
                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-tighter text-right">כניסות היום (ייחודי)</div>
                            <div className="text-2xl font-black text-white leading-none text-right">{getVisitStats().today}</div>
                        </div>
                    </div>
                    <div className="text-blue-500"><Info size={20} /></div>
                  </button>
                  <button 
  onClick={async () => {
    const { data } = await supabase.from('pending_carts').select('*').order('updated_at', { ascending: false });
    setPendingOrders(data || []);
    setShowPendingOrdersModal(true);
  }}
  className="bg-orange-600/10 border-2 border-orange-500/30 p-4 rounded-3xl flex items-center justify-between hover:bg-orange-600/20 transition-all active:scale-[0.98]"
>
  <div className="flex items-center gap-3">
    <div className="bg-orange-500 p-2 rounded-full text-white shadow-lg"><ShoppingCart size={20} /></div>
    <div className="text-right">
        <div className="text-[10px] font-black text-orange-400 uppercase tracking-tighter">הזמנות בתהליך</div>
        <div className="text-2xl font-black text-white leading-none">חי</div>
    </div>
  </div>
  <div className="text-orange-500"><Eye size={20} /></div>
</button>

                                    <div className="bg-purple-600/10 border-2 border-purple-500/30 p-4 rounded-3xl flex items-center justify-between transition-all text-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-500 p-2 rounded-full text-white shadow-lg text-center"><BellRing size={20} /></div>
                        <div className="text-right">
                            <div className="text-[10px] font-black text-purple-400 uppercase tracking-tighter text-right">לחיצות על "תתזכר אותי"</div>
                            <div className="text-2xl font-black text-white leading-none text-right">{reminderCount}</div>
                        </div>
                    </div>
                    <button 
                        onClick={async () => {
                          if(window.confirm("לאפס את מונה התזכורות?")) {
                            await supabase.from('site_events').delete().eq('event_name', 'reminder_click');
                            fetchVisits();
                          }
                        }}
                        className="p-2 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>


                  <div className="bg-amber-600/10 border-2 border-amber-500/30 p-4 rounded-3xl flex items-center justify-between transition-all text-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-500 p-2 rounded-full text-white shadow-lg text-center"><Trophy size={20} /></div>
                        <div className="text-right">
                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-tighter text-right">מונה מאפה מוזהב</div>
                            <div className="text-2xl font-black text-white leading-none text-right">{siteSettings.golden_pastry_counter} / {siteSettings.golden_pastry_target}</div>
                        </div>
                    </div>
                    {/* New Reset Button for Golden Counter */}
                    <button onClick={handleResetGoldenCounter} className="p-2 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"><RefreshCw size={16} /></button>
                  </div>
                  
<button 
  onClick={() => setShowProductSalesModal(true)}
  className="bg-indigo-600/10 border-2 border-indigo-500/30 p-4 rounded-3xl flex items-center justify-between hover:bg-indigo-600/20 transition-all active:scale-[0.98]"
>
  <div className="flex items-center gap-3">
    <div className="bg-indigo-500 p-2 rounded-full text-white shadow-lg"><BarChart3 size={20} /></div>
    <div className="text-right">
        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">פירוט מכירות</div>
        <div className="text-xl font-black text-white leading-none">סטטיסטיקת מוצרים</div>
    </div>
  </div>
  <div className="text-indigo-500"><ExternalLink size={20} /></div>
</button>

{/* כפתור פתיחת חלונית סטטיסטיקת מי אני */}
<button 
  onClick={() => {
    fetchVisits(); // רענון נתונים לפני הפתיחה
    setShowAboutStatsModal(true);
  }}
  className="bg-pink-600/10 border-2 border-pink-500/30 p-4 rounded-3xl flex items-center justify-between hover:bg-pink-600/20 transition-all active:scale-[0.98]"
>
  <div className="flex items-center gap-3">
    <div className="bg-pink-500 p-2 rounded-full text-white shadow-lg"><User size={20} /></div>
    <div className="text-right">
        <div className="text-[10px] font-black text-pink-400 uppercase tracking-tighter">סטטיסטיקת "מי אני"</div>
        <div className="text-xl font-black text-white leading-none">צפיות בסיפור</div>
    </div>
  </div>
  <div className="text-pink-500"><ExternalLink size={20} /></div>
</button>


<button 
  onClick={async () => {
    const { data } = await supabase.from('site_events').select('*').eq('event_name', 'recipe_view');
    setRecipeStatsData(data || []);
    setShowRecipeStatsModal(true);
  }}
  className="bg-pink-600/10 border-2 border-pink-500/30 p-4 rounded-3xl flex items-center justify-between hover:bg-pink-600/20 transition-all active:scale-[0.98]"
>
  <div className="flex items-center gap-3">
    <div className="bg-pink-500 p-2 rounded-full text-white shadow-lg"><BookOpen size={20} /></div>
    <div className="text-right">
        <div className="text-[10px] font-black text-pink-400 uppercase tracking-tighter">פופולריות מתכונים</div>
        <div className="text-xl font-black text-white leading-none">סטטיסטיקת מתכונים</div>
    </div>
  </div>
  <div className="text-pink-500"><ExternalLink size={20} /></div>
</button>



 

                  {showVisitorDetails && (
                    <div className="col-span-full mt-4 grid grid-cols-1 gap-3 animate-in slide-in-from-top-4 duration-300 text-center">
                        <div className="bg-slate-800/80 p-4 rounded-3xl border border-slate-700 shadow-inner text-right">
                            <div className="flex justify-around mb-6 text-center">
                                <div className="flex flex-col text-center">
                                  <span className="text-blue-400 font-black text-xl text-center">{getVisitStats().today}</span>
                                  <button onClick={() => openSourceModal('today')} className="text-[9px] font-bold text-slate-500 text-center hover:text-amber-500 transition-colors uppercase">היום</button>
                                </div>
                                <div className="w-[1px] bg-slate-700 h-8 self-center"></div>
                                <div className="flex flex-col text-center">
                                  <span className="text-blue-400 font-black text-xl text-center">{getVisitStats().week}</span>
                                  <button onClick={() => openSourceModal('week')} className="text-[9px] font-bold text-slate-500 text-center hover:text-amber-500 transition-colors uppercase">השבוע</button>
                                </div>
                                <div className="w-[1px] bg-slate-700 h-8 self-center"></div>
                                <div className="flex flex-col text-center">
                                  <span className="text-blue-400 font-black text-xl text-center">{getVisitStats().month}</span>
                                  <button onClick={() => openSourceModal('month')} className="text-[9px] font-bold text-slate-500 text-center hover:text-amber-500 transition-colors uppercase">החודש</button>
                                </div>
                            </div>
                            <div className="space-y-2 text-right">
                                <h4 className="text-[10px] font-black text-slate-400 mb-2 uppercase border-b border-slate-700 pb-1 text-right">פירוט יומי (שבוע אחרון)</h4>
                                {getVisitStats().dailyBreakdown.map((d, i) => (
                                    <div key={i} className="flex justify-between items-center text-right">
                                        <span className="text-[11px] font-bold text-slate-300">{d.label}</span>
                                        <div className="flex items-center gap-2 flex-1 mx-4 text-center">
                                            <div className="h-1.5 bg-blue-500/20 rounded-full flex-1 overflow-hidden text-center">
                                                <div className="h-full bg-blue-500 rounded-full text-center" style={{ width: `${Math.min(100, (d.count / (Math.max(...getVisitStats().dailyBreakdown.map(x=>x.count)) || 1)) * 100)}%` }}></div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-blue-400 text-center">{d.count}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button 
                                    onClick={handleResetTodayVisits}
                                    className="flex-1 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-[9px] font-black text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all text-center"
                                >
                                    איפוס היום
                                </button>
                                <button 
                                    onClick={handleResetAllVisits}
                                    className="flex-1 py-2 bg-slate-900/50 border border-slate-700 rounded-xl text-[9px] font-black text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all text-center"
                                >
                                    איפוס כל הזמנים
                                </button>
                            </div>
                            <div className="mt-3 text-[9px] font-black text-slate-500 uppercase text-center">
                                כניסות ייחודיות במערכת: <span className="text-blue-400">{visitData.length}</span>
                            </div>
                        </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
         
         {showVisitsModal && (
  <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-blue-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full animate-in zoom-in text-right">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Users className="text-blue-400" /> פירוט כניסות לאתר
        </h3>
        <button onClick={() => setShowVisitsModal(false)} className="text-slate-500 hover:text-white transition-colors">
          <X size={24}/>
        </button>
      </div>

      <div className="bg-slate-800/80 p-5 rounded-3xl border border-slate-700 shadow-inner">
        <div className="flex justify-around mb-8">
          <div className="flex flex-col items-center">
            <span className="text-blue-400 font-black text-2xl">{getVisitStats().today}</span>
            <button onClick={() => openSourceModal('today')} className="text-[10px] font-black text-slate-500 hover:text-amber-500 transition-colors uppercase">היום</button>
          </div>
          <div className="w-[1px] bg-slate-700 h-10 self-center"></div>
          <div className="flex flex-col items-center">
            <span className="text-blue-400 font-black text-2xl">{getVisitStats().week}</span>
            <button onClick={() => openSourceModal('week')} className="text-[10px] font-black text-slate-500 hover:text-amber-500 transition-colors uppercase">השבוע</button>
          </div>
          <div className="w-[1px] bg-slate-700 h-10 self-center"></div>
          <div className="flex flex-col items-center">
            <span className="text-blue-400 font-black text-2xl">{getVisitStats().month}</span>
            <button onClick={() => openSourceModal('month')} className="text-[10px] font-black text-slate-500 hover:text-amber-500 transition-colors uppercase">החודש</button>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-[11px] font-black text-slate-400 uppercase border-b border-slate-700 pb-2">גרף שבוע אחרון</h4>
          {getVisitStats().dailyBreakdown.map((d, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-300 w-16">{d.label}</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (d.count / (Math.max(...getVisitStats().dailyBreakdown.map(x=>x.count)) || 1)) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-xs font-black text-blue-400 w-8 text-left">{d.count}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button onClick={handleResetTodayVisits} className="py-3 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all">איפוס היום</button>
          <button onClick={handleResetAllVisits} className="py-3 bg-slate-900 border border-slate-700 rounded-xl text-[10px] font-black text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all">איפוס הכל</button>
        </div>
      </div>

      <button onClick={() => setShowVisitsModal(false)} className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all">סגור פירוט</button>
    </div>
  </div>
)}


{/* חלונית סטטיסטיקת מכירת מוצרים החדשה */}
{showProductSalesModal && (
  <div className="fixed inset-0 z-[700] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-indigo-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full animate-in zoom-in overflow-y-auto max-h-[85vh] text-right">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <BarChart3 className="text-indigo-400" /> סטטיסטיקת מכירת מוצרים
        </h3>
        <button onClick={() => setShowProductSalesModal(false)} className="text-slate-500 hover:text-white transition-colors">
          <X size={24}/>
        </button>
      </div>

      <div className="space-y-3 mb-8">
        {[...products]
          .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
          .map((p, idx) => (
            <div key={p.id} className="bg-slate-800/40 p-3 rounded-2xl flex items-center justify-between border border-slate-700/50 hover:bg-slate-800/60 transition-all">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${idx < 3 ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                  {idx + 1}
                </span>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-sm leading-tight text-white">{p.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    {categories.find(c => c.slug === p.category)?.name || 'כללי'}
                  </span>
                </div>
              </div>
              <div className="text-indigo-400 font-black text-lg">
                {(p.sales_count || 0)} <span className="text-[10px] text-slate-500">יח'</span>
              </div>
            </div>
          ))}
      </div>

      <div className="sticky bottom-0 bg-slate-900 pt-4 space-y-3">
        <button 
          onClick={resetStats} 
          className="w-full bg-red-600/20 text-red-500 border border-red-500/30 py-4 rounded-2xl font-black text-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <RotateCcw size={16} /> איפוס כל נתוני המכירות
        </button>
        <button 
          onClick={() => setShowProductSalesModal(false)} 
          className="w-full bg-slate-800 text-slate-400 py-3 rounded-2xl font-bold text-xs"
        >
          חזרה לסטטיסטיקה כללית
        </button>
      </div>
    </div>
  </div>
)}

          {showSourceModal && (
            <div className="fixed inset-0 z-[1200] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in zoom-in text-right">
              <div className="bg-slate-900 border-2 border-amber-500 p-6 rounded-[2.5rem] shadow-2xl max-md w-full text-right">
                <div className="flex justify-between items-center mb-6 text-right">
                  <h3 className="text-xl font-black text-white flex items-center gap-2 text-right">
                    <ExternalLink className="text-amber-500" /> 
                    {sourceTimeframe === 'today' ? 'מאיפה הגיעו היום?' : sourceTimeframe === 'week' ? 'מאיפה הגיעו השבוע?' : 'מאיפה הגיעו החודש?'}
                  </h3>
                  <button onClick={() => setShowSourceModal(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                </div>
                <div className="space-y-4 text-right overflow-y-auto max-h-[50vh]">
                    {getVisitStats().sources[sourceTimeframe].length > 0 ? getVisitStats().sources[sourceTimeframe].map(([src, count], idx) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                         <span className="font-bold text-slate-200">{src}</span>
                         <span className="font-black text-amber-500 text-xl">{count}</span>
                      </div>
                    )) : <p className="text-center text-slate-500 py-8">אין נתוני מקורות לתקופה זו</p>}
                </div>
                <button onClick={() => setShowSourceModal(false)} className="w-full mt-8 bg-amber-600 text-white py-4 rounded-2xl font-black text-center">סגור</button>
              </div>
            </div>
          )}

{showSettingsModal && (
  <div className="fixed inset-0 z-[1500] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
    <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in relative max-h-[90vh] overflow-y-auto custom-scrollbar">
      <button 
  onClick={() => { 
    setSiteSettings(settingsSnapshot); // מחזיר את ההגדרות למה שהיו לפני השינויים
    setShowSettingsModal(false); 
    setActiveSettingsTab(null); 
  }} 
  className="absolute top-6 left-6 text-slate-500 hover:text-white transition-colors"
>
  <X size={20}/>
</button>
      <Settings className="mx-auto text-amber-500 mb-4" size={40} />
      <h3 className="text-xl font-black mb-6 text-white text-center">הגדרות אתר</h3>

      {/* תפריט 3 כפתורים ראשיים */}
      {!activeSettingsTab ? (
        <div className="grid grid-cols-1 gap-3 mb-8">
          <button onClick={() => setActiveSettingsTab('titles')} className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center justify-between text-white hover:bg-slate-700 transition-all active:scale-95 shadow-lg">
            <span className="flex items-center gap-3 font-black text-sm"><Type size={18} className="text-amber-500"/> כותרות וכתובת</span>
            <ArrowLeft size={16} className="text-amber-500" />
          </button>
          
          <button onClick={() => setActiveSettingsTab('promos')} className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center justify-between text-white hover:bg-slate-700 transition-all active:scale-95 shadow-lg">
            <span className="flex items-center gap-3 font-black text-sm"><Zap size={18} className="text-red-500"/> הודעות ומבצעים</span>
            <ArrowLeft size={16} className="text-amber-500" />
          </button>

          <button onClick={() => setActiveSettingsTab('hours')} className="w-full bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center justify-between text-white hover:bg-slate-700 transition-all active:scale-95 shadow-lg">
            <span className="flex items-center gap-3 font-black text-sm"><Clock size={18} className="text-blue-400"/> ימי ושעות פעילות</span>
            <ArrowLeft size={16} className="text-amber-500" />
          </button>
        </div>
      ) : (
        <div className="space-y-4 mb-8 animate-in slide-in-from-left-4">
          <button onClick={() => setActiveSettingsTab(null)} className="text-amber-500 text-xs font-black flex items-center gap-1 mb-4 hover:underline"><ArrowRight size={14}/> חזרה לתפריט ההגדרות</button>

          {/* לשונית כותרות */}
          {activeSettingsTab === 'titles' && (
            <div className="space-y-3">
              <input className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center text-white font-bold outline-none focus:border-amber-500" value={siteSettings.main_title} onChange={e => setSiteSettings({...siteSettings, main_title: e.target.value})} placeholder="כותרת ראשית" />
              <input className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center text-white font-bold outline-none focus:border-amber-500" value={siteSettings.sub_title} onChange={e => setSiteSettings({...siteSettings, sub_title: e.target.value})} placeholder="כותרת משנית" />
              <input className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center text-white font-bold outline-none focus:border-amber-500" value={siteSettings.address} onChange={e => setSiteSettings({...siteSettings, address: e.target.value})} placeholder="כתובת העסק" />
            </div>
          )}

          {/* לשונית הודעות ומבצעים - כולל כל הפיצ'רים שחזרו */}
          {activeSettingsTab === 'promos' && (
            <div className="space-y-4">
              <div className="bg-red-500/5 p-3 rounded-xl border border-red-500/20">
                <label className="text-[10px] font-black text-red-500 block mb-1">הודעה דחופה (במקום "מישהו הזמין"):</label>
                <textarea className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white text-xs text-right outline-none" value={siteSettings.urgent_message} onChange={e => setSiteSettings({...siteSettings, urgent_message: e.target.value})} placeholder="למשל: נשארו 5 קראנץ' אחרונים! 🥐" rows={2} />
              </div>
              
              <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="text-xs font-bold text-white flex items-center gap-2"><Users size={14} className="text-amber-500"/> הפעל "מישהו הזמין" ו-FOMO</span>
                <input type="checkbox" className="w-5 h-5 accent-amber-500" checked={siteSettings.fomo_social_active} onChange={e => setSiteSettings({...siteSettings, fomo_social_active: e.target.checked})} />
              </div>

              {/* מבצע סוף יום המלא */}
              <div className="bg-red-500/10 border-2 border-red-500/30 p-4 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-red-500/20 pb-2">
                   <span className="text-sm font-black text-red-500 flex items-center gap-2"><Flame size={16}/> מבצע סוף יום</span>
                   <input type="checkbox" className="w-5 h-5 accent-red-500" checked={siteSettings.sale_active} onChange={e => setSiteSettings({...siteSettings, sale_active: e.target.checked})} />
                </div>
                {siteSettings.sale_active && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="grid grid-cols-2 gap-2">
                       <input type="time" className="bg-slate-900 border border-slate-700 p-2 rounded-xl text-white text-center font-bold" value={siteSettings.sale_end_time} onChange={e => setSiteSettings({...siteSettings, sale_end_time: e.target.value})} />
                       <input type="number" className="bg-slate-900 border border-slate-700 p-2 rounded-xl text-white text-center font-bold" value={siteSettings.sale_discount_percent} onChange={e => setSiteSettings({...siteSettings, sale_discount_percent: Number(e.target.value)})} placeholder="% הנחה" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {categories.map(cat => (
                        <button key={cat.id} type="button" onClick={() => {
                            const current = siteSettings.sale_categories || [];
                            const next = current.includes(cat.slug) ? current.filter(s => s !== cat.slug) : [...current, cat.slug];
                            setSiteSettings({...siteSettings, sale_categories: next});
                          }} className={`px-2 py-1 rounded-full text-[9px] font-bold border transition-all ${siteSettings.sale_categories?.includes(cat.slug) ? 'bg-red-600 text-white' : 'bg-slate-900 text-slate-500'}`}>{cat.name}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

{/* מבצע מתנה מעל סכום מסוים */}
<div className="bg-green-500/10 border-2 border-green-500/30 p-4 rounded-2xl space-y-4">
  <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
     <span className="text-sm font-black text-green-500 flex items-center gap-2"><Gift size={16}/> מתנה בקנייה מעל סכום</span>
     <input type="checkbox" className="w-5 h-5 accent-green-500" checked={siteSettings.threshold_promo_active} onChange={e => setSiteSettings({...siteSettings, threshold_promo_active: e.target.checked})} />
  </div>
  {siteSettings.threshold_promo_active && (
    <div className="space-y-3 animate-in fade-in">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">מינימום להטבה (₪):</span>
        <input type="number" className="w-24 bg-slate-900 border border-slate-700 p-2 rounded-xl text-white text-center font-bold" value={siteSettings.threshold_promo_limit} onChange={e => setSiteSettings({...siteSettings, threshold_promo_limit: Number(e.target.value)})} />
      </div>
      <button 
        onClick={() => setShowGiftSelectorInAdmin(true)}
        className="w-full py-2 bg-slate-800 text-green-400 rounded-xl font-black text-[10px] border border-green-500/30"
      >
        בחר מוצרים למתנה ({siteSettings.threshold_promo_items?.length || 0})
      </button>
    </div>
  )}
</div>

              {/* מאפה מוזהב המלא */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-amber-500 flex items-center gap-2"><Trophy size={14}/> יעד מאפה מוזהב</span>
                   <div className="flex items-center gap-2">
                      <input type="number" className="w-14 bg-slate-900 p-1 rounded-lg text-center text-white" value={siteSettings.golden_pastry_target} onChange={e => setSiteSettings({...siteSettings, golden_pastry_target: Number(e.target.value)})} />
                      <input type="checkbox" className="w-5 h-5 accent-amber-500" checked={siteSettings.golden_pastry_active} onChange={e => setSiteSettings({...siteSettings, golden_pastry_active: e.target.checked})} />
                   </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>מונה נוכחי:</span>
                  <input type="number" className="w-14 bg-slate-900 p-1 rounded-lg text-center text-white" value={siteSettings.golden_pastry_counter} onChange={e => setSiteSettings({...siteSettings, golden_pastry_counter: Number(e.target.value)})} />
                </div>
              </div>
{/* החזרת בחירת הטבת לוגו סודית */}
<div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-2xl space-y-2">
  <label className="text-[10px] font-black text-blue-400 block uppercase flex items-center gap-2">
    <Trophy size={14} /> הטבה סודית (3 לחיצות על לוגו):
  </label>
  <select 
    className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-right text-white outline-none focus:border-blue-500 font-bold text-xs appearance-none"
    value={siteSettings.reward_type}
    onChange={e => setSiteSettings({...siteSettings, reward_type: e.target.value})}
  >
    <option value="none">ללא הטבה (מבוטל)</option>
    <option value="12_percent">12% הנחה סודית</option>
    <option value="5_percent">5% הנחה סודית</option>
    <option value="6th_free">מאפה שישי במתנה (6 ב-5)</option>
  </select>
  <p className="text-[9px] text-slate-500 pr-1">* ההטבה תופעל רק לאחר 3 לחיצות רצופות על הלוגו הראשי</p>
</div>

              {/* קוד קופון המלא */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-2xl space-y-3">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-2"><Ticket size={14}/> קוד קופון פעיל</span>
                    <input type="checkbox" className="w-5 h-5 accent-purple-500" checked={siteSettings.coupon_active} onChange={e => setSiteSettings({...siteSettings, coupon_active: e.target.checked})} />
                 </div>
                 {siteSettings.coupon_active && (
                   <div className="grid grid-cols-2 gap-2 animate-in fade-in">
                      <input className="bg-slate-900 border border-slate-700 p-2 rounded-xl text-white text-center font-bold" value={siteSettings.coupon_code} onChange={e => setSiteSettings({...siteSettings, coupon_code: e.target.value})} placeholder="הקוד" />
                      <input type="number" className="bg-slate-900 border border-slate-700 p-2 rounded-xl text-white text-center font-bold" value={siteSettings.coupon_discount_percent} onChange={e => setSiteSettings({...siteSettings, coupon_discount_percent: Number(e.target.value)})} placeholder="%" />
                   </div>
                 )}
              </div>
            </div>
          )}

          {/* לשונית ימי ושעות פעילות */}
          {activeSettingsTab === 'hours' && (
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <label className="text-[10px] font-bold text-slate-400 block mb-2">ימי היריד:</label>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {daysOfWeek.map(d => (
                    <button key={d.value} onClick={() => {
                        const current = siteSettings.fair_days || [];
                        const next = current.includes(d.value) ? current.filter(v => v !== d.value) : [...current, d.value];
                        setSiteSettings({...siteSettings, fair_days: next});
                      }} className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black border transition-all ${siteSettings.fair_days?.includes(d.value) ? 'bg-amber-600 border-amber-400 text-white shadow-lg' : 'bg-slate-900 text-slate-500 border-slate-700'}`}>{d.label}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-[9px] font-black block text-slate-500 mb-1 uppercase">פתיחה יריד</span>
                  <input type="time" className="w-full bg-transparent text-white font-bold text-center outline-none" value={siteSettings.opening_hour} onChange={e => setSiteSettings({...siteSettings, opening_hour: e.target.value})} />
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <span className="text-[9px] font-black block text-slate-500 mb-1 uppercase">סגירה יריד</span>
                  <input type="time" className="w-full bg-transparent text-white font-bold text-center outline-none" value={siteSettings.closing_hour} onChange={e => setSiteSettings({...siteSettings, closing_hour: e.target.value})} />
                </div>
                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded-xl">
                  <span className="text-[9px] font-black block text-green-500 mb-1 uppercase">התחלה וואטסאפ</span>
                  <input type="time" className="w-full bg-transparent text-white font-bold text-center outline-none" value={siteSettings.whatsapp_opening_hour} onChange={e => setSiteSettings({...siteSettings, whatsapp_opening_hour: e.target.value})} />
                </div>
                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded-xl">
                  <span className="text-[9px] font-black block text-green-500 mb-1 uppercase">סיום וואטסאפ</span>
                  <input type="time" className="w-full bg-transparent text-white font-bold text-center outline-none" value={siteSettings.whatsapp_closing_hour} onChange={e => setSiteSettings({...siteSettings, whatsapp_closing_hour: e.target.value})} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* רכיבים שזמינים תמיד בתחתית */}
      <div className="pt-6 border-t border-slate-800 space-y-4">
        <button onClick={() => setShowPasswordModal(true)} className="w-full bg-slate-800/50 border border-slate-700 py-3 rounded-2xl text-amber-500 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-slate-800">
          <KeyRound size={16} /> שינוי סיסמה
        </button>

        <div className="bg-slate-800/30 p-3 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-black text-slate-400 uppercase mb-3 block text-center">סטטוס האתר:</span>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
            {[{id:'open',t:'פתוח'},{id:'busy',t:'לחץ'},{id:'closed',t:'סגור'}].map(s => (
              <button key={s.id} onClick={() => setSiteSettings({...siteSettings, site_status: s.id})}
                className={`flex-1 py-2 rounded-lg text-[11px] font-black transition-all ${siteSettings.site_status === s.id ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{s.t}</button>
            ))}
          </div>
        </div>

        <button onClick={async () => { await saveSiteSettings(); setShowSettingsModal(false); setActiveSettingsTab(null); alert("הגדרות נשמרו בהצלחה!"); }} className="w-full bg-amber-500 text-[#0f172a] py-4 rounded-full font-black text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 transition-all">
          שמור הכל וסגור
        </button>
      </div>
    </div>
  </div>
)}

{showExtraSettingsModal && (
  <div className="fixed inset-0 z-[500] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
    <div className="bg-slate-900 border-2 border-green-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in relative max-h-[90vh] overflow-y-auto">
      <button onClick={() => { setSiteSettings(settingsSnapshot); setShowExtraSettingsModal(false); setActiveExtraTab(null); }} className="absolute top-6 left-6 text-slate-500 hover:text-white"><X size={20}/></button>
      <Edit2 className="mx-auto text-green-400 mb-4" size={40} />
      <h3 className="text-xl font-black mb-6 text-white text-center">עריכה אישית</h3>

      {/* תפריט 7 כפתורים */}
      {!activeExtraTab ? (
        <div className="grid grid-cols-1 gap-2">
          {[
            { id: 'brand', label: 'הגדרות מותג ו-SEO', icon: <Wand2 size={16}/> },
            { id: 'instagram', label: 'שיתוף באינסטגרם', icon: <Instagram size={16}/> },
            { id: 'supabase', label: 'Supabase', icon: <Database size={16}/> },
            { id: 'social', label: 'לוגו ורשתות חברתיות', icon: <Facebook size={16}/> },
            { id: 'popup', label: 'הודעה קופצת בכניסה', icon: <BellRing size={16}/> },
            { id: 'extra', label: 'כפתור נוסף להזמנות', icon: <ExternalLink size={16}/> },
            { id: 'about', label: 'מי אני (הסיפור שלי)', icon: <User size={16}/> },

            { id: 'pickup', label: 'אפשרויות איסוף', icon: <MapPin size={16}/> }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveExtraTab(tab.id)} className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center justify-between text-white font-bold hover:bg-slate-700 transition-all">
              <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
              <ArrowLeft size={16} className="text-green-500" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-left-4">
          <button onClick={() => setActiveExtraTab(null)} className="text-green-500 text-xs font-black flex items-center gap-1 mb-4"><ArrowRight size={14}/> חזרה לתפריט</button>

{activeExtraTab === 'about' && (
  <div className="space-y-4 animate-in slide-in-from-left-4">
    <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
      <span className="text-xs font-bold text-white flex items-center gap-2">
        <Eye size={14} className="text-pink-500"/> הצג את כפתור "מי אני" באתר?
      </span>
      <input 
        type="checkbox" 
        className="w-5 h-5 accent-pink-500" 
        checked={siteSettings.about_active} 
        onChange={e => setSiteSettings({...siteSettings, about_active: e.target.checked})} 
      />
    </div>
    
    <div className="bg-slate-800/50 p-3 rounded-xl border border-pink-500/20">
      <label className="text-[10px] font-black text-pink-400 block mb-2">קישור לתמונה שלך (מרובעת):</label>
      <input className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.about_image_url} onChange={e => setSiteSettings({...siteSettings, about_image_url: e.target.value})} placeholder="URL תמונה" />
    </div>

    <div className="bg-slate-800/50 p-3 rounded-xl border border-pink-500/20">
      <label className="text-[10px] font-black text-pink-400 block mb-2">הסיפור שלך (תומך ב-HTML):</label>
      <textarea className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white text-xs text-right outline-none" rows={12} value={siteSettings.about_text} onChange={e => setSiteSettings({...siteSettings, about_text: e.target.value})} placeholder="כאן תוכל לכתוב מי אתה... השתמש ב <br/> לירידת שורה." />
    </div>
  </div>
)}


{activeExtraTab === 'brand' && (
  <div className="space-y-3">
    <div className="bg-slate-800/50 p-2 rounded-xl border border-amber-500/20 mb-2">
      <label className="text-[10px] font-black text-amber-500 block mb-1 pr-1">שם המותג לתזכורת ביומן:</label>
      <input 
        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs font-bold" 
        value={siteSettings.reminder_brand_name} 
        onChange={e => setSiteSettings({...siteSettings, reminder_brand_name: e.target.value})} 
        placeholder="למשל: ליאור בן משה" 
      />
    </div>
    <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.seo_title} onChange={e => setSiteSettings({...siteSettings, seo_title: e.target.value})} placeholder="כותרת SEO" />
    <textarea className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" rows={2} value={siteSettings.seo_description} onChange={e => setSiteSettings({...siteSettings, seo_description: e.target.value})} placeholder="תיאור SEO" />
    <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.whatsapp_recipient_name} onChange={e => setSiteSettings({...siteSettings, whatsapp_recipient_name: e.target.value})} placeholder="שם מקבל ההודעה" />
    <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.payment_details} onChange={e => setSiteSettings({...siteSettings, payment_details: e.target.value})} placeholder="פרטי תשלום" />
  </div>
)}


          {activeExtraTab === 'instagram' && (
            <div className="space-y-3">
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.story_image_url} onChange={e => setSiteSettings({...siteSettings, story_image_url: e.target.value})} placeholder="URL תמונת סטורי" />
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.instagram_username} onChange={e => setSiteSettings({...siteSettings, instagram_username: e.target.value})} placeholder="שם משתמש אינסטגרם" />
            </div>
          )}

          {activeExtraTab === 'supabase' && (
            <div className="space-y-3">
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-[10px]" dir="ltr" value={siteSettings.supabase_url || SUPABASE_URL} onChange={e => setSiteSettings({...siteSettings, supabase_url: e.target.value})} placeholder="Supabase URL" />
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-[10px]" dir="ltr" value={siteSettings.supabase_key || SUPABASE_ANON_KEY} onChange={e => setSiteSettings({...siteSettings, supabase_key: e.target.value})} placeholder="Supabase Key" />
            </div>
          )}

          {activeExtraTab === 'social' && (
            <div className="space-y-3">
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.logo_url} onChange={e => setSiteSettings({...siteSettings, logo_url: e.target.value})} placeholder="URL לוגו" />
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.whatsapp_number} onChange={e => setSiteSettings({...siteSettings, whatsapp_number: e.target.value})} placeholder="מספר וואטסאפ" />
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.instagram_url} onChange={e => setSiteSettings({...siteSettings, instagram_url: e.target.value})} placeholder="לינק אינסטגרם" />
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.facebook_url} onChange={e => setSiteSettings({...siteSettings, facebook_url: e.target.value})} placeholder="לינק פייסבוק" />
            </div>
          )}

          {activeExtraTab === 'popup' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-800 p-3 rounded-xl">
                <span className="text-white text-xs font-bold">הפעל הודעה?</span>
                <input type="checkbox" checked={siteSettings.popup_active} onChange={e => setSiteSettings({...siteSettings, popup_active: e.target.checked})} />
              </div>
              <textarea className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" rows={3} value={siteSettings.popup_text} onChange={e => setSiteSettings({...siteSettings, popup_text: e.target.value})} placeholder="מלל הודעה" />
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.popup_image_url} onChange={e => setSiteSettings({...siteSettings, popup_image_url: e.target.value})} placeholder="URL תמונה" />
            </div>
          )}

          {activeExtraTab === 'extra' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-800 p-3 rounded-xl">
                <span className="text-white text-xs font-bold">הפעל כפתור?</span>
                <input type="checkbox" checked={siteSettings.extra_button_active} onChange={e => setSiteSettings({...siteSettings, extra_button_active: e.target.checked})} />
              </div>
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.extra_button_text} onChange={e => setSiteSettings({...siteSettings, extra_button_text: e.target.value})} placeholder="מלל כפתור" />
              <input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-white text-xs" value={siteSettings.extra_button_url} onChange={e => setSiteSettings({...siteSettings, extra_button_url: e.target.value})} placeholder="לינק כפתור" />
            </div>
          )}

          {activeExtraTab === 'pickup' && (
            <div className="space-y-3">
              {orderOptions.map(opt => (
                <div key={opt.id} className="bg-slate-800 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-xs text-white">{opt.label} (₪{opt.cost})</span>
                  {!opt.is_pickup && <button onClick={async () => { if(confirm("למחוק?")) { await supabase.from('order_options').delete().eq('id', opt.id); fetchOrderOptions(); } }} className="text-red-500"><Trash2 size={14}/></button>}
                </div>
              ))}
              <button onClick={async () => { 
  const label = prompt("שם האופציה? (למשל: משלוח תל אביב)"); 
  const cost = prompt("עלות נוספת? (במספר בלבד)"); 
  const prefix = prompt("תחילת ההודעה בוואטסאפ? (למשל: היי ליאור, הזמנה למשלוח:)");
  
  if(label && prefix) { 
    const { error } = await supabase.from('order_options').insert([
      { label, cost: Number(cost), message_prefix: prefix, is_pickup: false }
    ]); 
    if (!error) {
      await fetchOrderOptions(); 
      alert("האופציה התווספה בהצלחה!");
    } else {
      alert("שגיאה בהוספה: " + error.message);
    }
  }
}} className="w-full py-3 bg-green-600/20 text-green-400 rounded-xl text-[11px] font-black border border-green-600/30 active:scale-95 transition-all mt-2">
  + הוסף אפשרות חדשה (משלוח וכו')
</button>
           </div>
          )}
        </div>
      )}

{activeExtraTab && (
  <button 
    onClick={() => setShowSaveConfirm(true)} 
    className="w-full mt-8 bg-green-500 text-[#0f172a] py-4 rounded-full font-black text-lg shadow-lg active:scale-95 transition-all"
  >
    שמור הכל וסגור
  </button>
)}


    </div>
  </div>
)}

{showSaveConfirm && (
  <div className="fixed inset-0 z-[3000] flex items-center justify-center px-6 bg-black/95 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center animate-in zoom-in">
      <Lock className="mx-auto text-amber-500 mb-4" size={48} />
      <h3 className="text-xl font-black mb-2 text-white">אישור מנהל לשמירה</h3>
      <p className="text-slate-400 text-sm mb-6">הזן סיסמת מנהל כדי לאשר את השינויים בעריכה האישית</p>

      <input 
        type="password" 
        inputMode="numeric"
        placeholder="סיסמת מנהל"
        className="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-2xl text-center text-xl text-white outline-none focus:border-amber-500 mb-6 font-bold"
        value={saveConfirmPass}
        onChange={e => setSaveConfirmPass(e.target.value)}
      />

      <div className="flex flex-col gap-3">
        <button 
          onClick={async () => {
            if (saveConfirmPass === siteSettings.password) {
              await saveSiteSettings();
              setShowSaveConfirm(false);
              setShowExtraSettingsModal(false);
              setSaveConfirmPass(""); // איפוס סיסמה
              alert("השינויים נשמרו בהצלחה!");
            } else {
              alert("סיסמה שגויה! השינויים לא נשמרו.");
            }
          }} 
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all"
        >
          אשר ושמור שינויים
        </button>
        <button 
          onClick={() => {
            setShowSaveConfirm(false);
            setSaveConfirmPass("");
          }} 
          className="w-full bg-slate-800 text-slate-400 py-3 rounded-2xl font-bold"
        >
          ביטול
        </button>
      </div>
    </div>
  </div>
)}



          {showPasswordModal && (
            <div className="fixed inset-0 z-[600] flex justify-center items-start pt-[25vh] bg-black/95 backdrop-blur-xl p-4">
              <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative">
                <Lock className="mx-auto text-amber-500 mb-4 text-center" size={40} />
                <h3 className="text-xl font-black mb-6 text-white text-center">שינוי סיסמה</h3>
                <div className="space-y-4 mb-8 text-right">
                  <div className="text-right">
                    <label className="text-[10px] font-bold text-slate-500 mr-2 text-right">סיסמה נוכחית:</label>
                    <input 
                      type="password" 
                      inputMode="numeric"
                      className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center text-white outline-none focus:border-amber-500 font-bold text-center"
                      value={passForm.old}
                      onChange={e => setPassForm({...passForm, old: e.target.value})}
                    />
                  </div>
                  <div className="text-right">
                    <label className="text-[10px] font-bold text-slate-500 mr-2 text-right">סיסמה חדשה:</label>
                    <input 
                      type="password" 
                      inputMode="numeric"
                      className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center text-white outline-none focus:border-amber-500 font-bold text-center"
                      value={passForm.new}
                      onChange={e => setPassForm({...passForm, new: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-3 text-center">
                  <button onClick={handlePasswordChange} className="flex-1 bg-amber-500 text-[#0f172a] py-4 rounded-full font-black text-lg active:scale-95 text-center">עדכן סיסמה</button>
                  <button onClick={() => setShowPasswordModal(false)} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-full font-black text-lg active:scale-95 text-center">ביטול</button>
                </div>
              </div>
            </div>
          )}

          {showAddItemModal && (
            <div className="fixed inset-0 z-[800] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl overflow-y-auto py-8">
              <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full animate-in zoom-in text-center relative m-auto">
                <div className="flex justify-between items-center mb-6 text-right"><h3 className="text-lg font-black text-white text-center w-full">{editingProduct ? 'עריכת פריט' : 'הוספת פריט חדש'}</h3><button onClick={() => {setEditingProduct(null); setShowAddItemModal(false);}} className="text-slate-500 hover:text-white"><X size={24}/></button></div>
                <form onSubmit={handleSaveProduct} className="space-y-4 text-center">
                  <input name="name" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center font-bold outline-none focus:border-amber-500 text-center" placeholder="שם המאפה" defaultValue={editingProduct?.name || ''} required />
                  <textarea name="description" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center text-sm outline-none focus:border-amber-500 text-center" placeholder="תיאור קצר..." defaultValue={editingProduct?.description || ''} rows={2} />
<div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
  <div className="flex justify-between items-center mb-2">
    <span className="text-[11px] font-black text-amber-500 uppercase">סוגים ומלאי (למשל: וניל, שוקולד)</span>
    <button 
      type="button"
      onClick={() => setTempVariants([...tempVariants, { name: "", stock: "" }])}
      className="bg-amber-600 hover:bg-amber-500 text-white p-1.5 rounded-lg transition-all active:scale-90"
    >
      <Plus size={16} />
    </button>
  </div>

  {tempVariants.map((v, idx) => (
    <div key={idx} className="flex gap-2 items-center animate-in slide-in-from-right-2">
      <input 
        placeholder="שם הסוג"
        className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded-xl text-center text-xs text-white outline-none focus:border-amber-500"
        value={v.name}
        onChange={(e) => {
          const newVariants = [...tempVariants];
          newVariants[idx].name = e.target.value;
          setTempVariants(newVariants);
        }}
      />
      <input 
        type="number"
        placeholder="מלאי"
        className="w-16 bg-slate-900 border border-slate-700 p-2 rounded-xl text-center text-xs text-white outline-none focus:border-amber-500"
        value={v.stock}
        onChange={(e) => {
          const newVariants = [...tempVariants];
          newVariants[idx].stock = e.target.value;
          setTempVariants(newVariants);
        }}
      />
      <button 
        type="button"
        onClick={() => setTempVariants(tempVariants.filter((_, i) => i !== idx))}
        className="text-red-500 p-1 hover:bg-red-500/10 rounded-lg transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  ))}

  {tempVariants.length === 0 && (
    <p className="text-[9px] text-slate-500 text-center">אין סוגים (מוצר רגיל)</p>
  )}
</div>
                {(formCategory === 'desserts' || categories.find(c => c.slug === formCategory)?.name === 'קינוחים') && (<textarea name="heating_instructions" className="w-full bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl text-center text-sm outline-none text-amber-200 focus:border-amber-500 font-bold text-center" placeholder="המלצת השף..." defaultValue={editingProduct?.heating_instructions || ''} rows={2} />)}
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl space-y-4 text-center">
                      <div className="flex flex-col gap-2"><span className="text-[10px] font-black text-slate-400 text-center">קטגוריה:</span><div className="flex flex-wrap justify-center gap-2 text-center">{categories.map(c => (<label key={c.id} className="flex items-center gap-1 cursor-pointer text-center"><input type="radio" name="category" value={c.slug} defaultChecked={editingProduct?.category === c.slug || (!editingProduct && c.slug === 'pastries')} onChange={(e) => setFormCategory(e.target.value)} className="hidden peer text-center" /><span className="px-3 py-1.5 rounded-full border border-slate-600 text-[9px] font-bold peer-checked:bg-amber-600 peer-checked:border-amber-400 peer-checked:text-white transition-all text-center">{c.name}</span></label>))}</div></div>
                      <div className="flex justify-between items-center border-t border-slate-700 pt-3 text-center"><span className="text-[10px] font-black text-slate-400 text-center">מיקום בתצוגה (מספר):</span><input name="display_order" type="number" className="w-20 bg-slate-900 border border-slate-600 p-2 rounded-xl text-center font-bold text-amber-500 outline-none text-center" defaultValue={editingProduct?.display_order} placeholder="אוטו'" /></div>
                      <div className="flex justify-between items-center border-t border-slate-700 pt-3">
                        <span className="text-[10px] font-black text-slate-400">ללא גלוטן?</span>
                        <input name="is_gluten_free" type="checkbox" className="w-5 h-5 accent-amber-500" defaultChecked={editingProduct?.is_gluten_free} />
                      </div>
                  </div>
<input name="price" type="number" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center font-bold outline-none focus:border-amber-500 text-center" placeholder="מחיר" defaultValue={editingProduct?.price || ''} required />

{/* ניהול מלאי חדש */}
<div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-black text-amber-500">מלאי כללי (ריק = ללא הגבלה):</span>
    <input name="stock" type="number" className="w-24 bg-slate-900 border border-slate-600 p-2 rounded-xl text-center font-bold text-white outline-none" defaultValue={editingProduct?.stock} placeholder="∞" />
  </div>

  {editingProduct?.variants?.length > 0 && (
    <div className="pt-2 border-t border-slate-700">
      <p className="text-[9px] font-bold text-slate-400 mb-2">מלאי לפי סוגים:</p>
      {editingProduct.variants.map(v => (
        <div key={v} className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-slate-300">{v}:</span>
          <input 
            type="number" 
            className="w-20 bg-slate-900 border border-slate-700 p-1 rounded-lg text-center text-xs text-white"
            placeholder="∞"
            data-variant-stock={v}
            defaultValue={editingProduct.variant_stock?.[v]}
          />
        </div>
      ))}
    </div>
  )}
</div>
                  <input name="image" className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-center text-[10px] outline-none focus:border-amber-500 text-center" placeholder="URL תמונה" defaultValue={editingProduct?.image || ''} />
                  <div className="flex gap-3 text-center">
                    <button type="submit" className="flex-1 bg-amber-600 text-white py-4 rounded-full font-black text-lg shadow-lg text-center">שמור מוצר</button>
                    {editingProduct && (
                      <div className="flex gap-2 text-center">
                        <button type="button" onClick={() => duplicateProduct(editingProduct)} className="bg-blue-600/20 text-blue-400 p-4 rounded-full border border-blue-500/50 hover:bg-blue-600 hover:text-white transition-all shadow-lg text-center" title="שכפל פריט"><Copy size={24}/></button>
                        <button type="button" onClick={() => deleteProduct(editingProduct.id)} className="bg-red-600/20 text-red-500 p-4 rounded-full border border-red-500/50 hover:bg-red-600 hover:text-white transition-all shadow-lg text-center" title="מחק פריט"><Trash2 size={24}/></button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
        
          {/* Floating Menu & About Button Container - רוחב 45px */}
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end pointer-events-none gap-2">
            
            {/* כפתור מי אני - 45px עם טקסט מוקטן */}
            {siteSettings.about_active && siteSettings.about_text && siteSettings.about_text.trim() !== "" && (
              <button 
                onClick={() => { setShowAboutModal(true); logAboutView('internal_click'); }} 
                className="bg-slate-800/95 border-y border-l border-pink-500/40 w-[45px] py-1.5 rounded-l-2xl shadow-xl hover:bg-slate-700 transition-all flex flex-col items-center justify-center active:scale-95 group pointer-events-auto animate-in slide-in-from-right-4 duration-700 gap-0"
              >
                <span className="text-lg filter drop-shadow-md mb-0.5">👨‍🍳</span>
                {/* טקסט מוקטן מאוד כדי להיכנס ב-45px בשורה אחת */}
                <span className="text-[7px] font-black text-pink-400 uppercase tracking-tighter leading-none whitespace-nowrap transform scale-90">הכירו אותי</span>
              </button>
            )}

            {/* תפריט הקטגוריות שנפתח */}
            {showFloatingMenu && (
              <div className="flex flex-col gap-2 pointer-events-auto animate-in slide-in-from-right-full duration-500 ease-out items-end w-full">
                {/* כפתור שינוי תצוגה */}
                <button 
                    onClick={() => { toggleViewMode(); setShowFloatingMenu(false); }}
                    className="bg-amber-500 border-y border-l border-amber-400 p-2 w-full rounded-l-2xl shadow-xl hover:bg-amber-400 transition-all flex flex-col items-center justify-center active:scale-95 group"
                  >
                    <span className="text-xl md:text-2xl filter drop-shadow-md text-[#0f172a]">
                      {viewMode === 'gallery' ? <List size={24} /> : <LayoutGrid size={24} />}
                    </span>
                    <span className="text-[9px] font-black text-[#0f172a] uppercase tracking-tighter mt-1 leading-none">
                      {viewMode === 'gallery' ? 'רשימה' : 'גלריה'}
                    </span>
                </button>

                {/* לולאת קטגוריות */}
                {categories.filter(c => c.is_visible).map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => { scrollToCategory(c.slug); setShowFloatingMenu(false); }} 
                    className="bg-slate-800/95 border-y border-l border-amber-500/40 p-2 w-full rounded-l-2xl shadow-xl hover:bg-slate-700 transition-all flex flex-col items-center justify-center active:scale-95 group"
                  >
                    <span className="text-xl md:text-2xl filter drop-shadow-md">{c.icon}</span>
                    <span className="text-[7px] font-black text-amber-500 uppercase tracking-tighter mt-1">{c.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* כפתור ההמבורגר - 45px */}
            <button 
              onClick={() => setShowFloatingMenu(!showFloatingMenu)} 
              className="bg-slate-800/95 border-y border-l border-amber-500/40 w-[45px] h-[40px] rounded-l-2xl shadow-xl pointer-events-auto hover:bg-slate-700 transition-colors active:scale-90 flex items-center justify-center"
            >
              <Menu size={20} className="text-amber-500" />
            </button>
          </div>

          {/* Benefit Gauge - Top Center */}
          {!isAdmin && isDiscountActive && siteSettings.reward_type === '6th_free' && totalPastriesInCart > 0 && (
            <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[250] w-auto animate-in slide-in-from-top-4 duration-500 pointer-events-none">
              <div className="bg-[#0f172a]/95 border border-slate-700/80 p-2 px-5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl pointer-events-auto">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] md:text-xs font-black text-amber-500 uppercase tracking-tighter">בחרת {totalPastriesInCart % 6 === 0 && totalPastriesInCart > 0 ? 6 : totalPastriesInCart % 6}/6 מאפים</span>
                      <div className="h-2 w-28 md:w-40 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner mt-1">
                        <div 
                          className={`h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-700 ease-out ${totalPastriesInCart % 6 === 0 ? 'shimmer-effect' : ''}`}
                          style={{ width: `${((totalPastriesInCart % 6 || (totalPastriesInCart > 0 ? 6 : 0)) / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                    {totalPastriesInCart % 6 === 0 && totalPastriesInCart > 0 && <Trophy size={16} className="text-amber-500 animate-bounce" />}
                </div>
              </div>

              {totalPastriesInCart % 6 === 0 && totalPastriesInCart > 0 && (
                <div className="absolute inset-0 pointer-events-none flex justify-center">
                  {[...Array(30)].map((_, i) => (
                    <div 
                      key={i} 
                      className="confetti-new" 
                      style={{ 
                        left: `50%`,
                        '--x': `${(Math.random() - 0.5) * 400}px`,
                        '--y': `${Math.random() * 300 + 100}px`,
                        '--r': `${Math.random() * 1000}deg`,
                        width: `${Math.random() * 8 + 5}px`,
                        height: `${Math.random() * 8 + 5}px`,
                        backgroundColor: ['#f59e0b', '#fbbf24', '#ffffff', '#fb7185', '#60a5fa', '#34d399'][i % 6],
                        animationDelay: `${Math.random() * 0.3}s`,
                        animationDuration: `${Math.random() * 0.8 + 1}s`
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}



{/* Vegan Stats - רוחב 50px קבוע וממורכז */}
{calculateTotal() > 0 && !isVeganStatsDismissed && (
  <div className={`fixed top-1/2 left-0 -translate-y-1/2 z-[100] transition-all duration-700 pointer-events-none ${showCompassion ? 'opacity-100 translate-x-0 animate-slide-left' : 'opacity-0 -translate-x-full'}`}>
    <div 
      onClick={(e) => {
        e.stopPropagation();
        setIsVeganStatsDismissed(true);
        setShowCompassion(false);
      }}
      // שינוי: w-[50px], px-0, flex-col, items-center
      className="bg-slate-900/95 border border-green-500/30 w-[50px] py-2 rounded-r-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl pointer-events-auto cursor-pointer hover:bg-slate-800 transition-colors flex flex-col items-center justify-center gap-1"
    >
      <div className="flex gap-0.5 text-[10px]">
        <span>🐓</span>
        <span>🐄</span>
      </div>
      <div className="flex flex-col items-center gap-0.5 text-green-400 font-bold w-full text-center">
        <Leaf size={14} fill="currentColor" /> 
        <span className="text-amber-400 font-black tracking-tight text-[8px] uppercase leading-none" dir="ltr">Go Vegan</span>
        <span className="text-[8px] text-slate-600 font-normal opacity-50">X</span>
      </div>
    </div>
  </div>
)}




          <div className={`fixed top-0 left-1/2 -translate-x-1/2 z-[300] w-auto pointer-events-none px-4 transition-all duration-700 ease-in-out ${showBoxAlert ? 'translate-y-24 opacity-100' : '-translate-y-full opacity-0'} text-center`}>
            <div className="bg-slate-900/95 border-2 border-amber-500 text-amber-500 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 backdrop-blur-md text-center"><ShoppingBasket size={18} /><span className="font-black text-sm md:text-base whitespace-nowrap text-center">עוד מאפה והקופסה מלאה 📦</span></div>
          </div>

          <header className="py-1 flex flex-col items-center px-4 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
            






            <div className="w-full max-w-2xl px-2 mb-0">
                <div className="grid grid-cols-3 w-full items-stretch">
                    
{/* עמודה ימנית: רשתות למעלה, מתכונים למטה */}
<div className="flex flex-col justify-between items-start py-1">
    {/* קבוצת הרשתות שמגדירה את הרוחב */}
    <div className="flex gap-1.5 justify-start items-center">
      <a href={siteSettings.instagram_url} target="_blank" className="p-2 bg-white/5 rounded-xl border border-white/10 text-pink-500 hover:scale-110 transition-transform"><Instagram size={18} /></a>
      <a href={siteSettings.facebook_url} target="_blank" className="p-2 bg-white/5 rounded-xl border border-white/10 text-blue-500 hover:scale-110 transition-transform"><Facebook size={18} /></a>
    </div>

    {/* כפתור מתכונים - גובה 32px, רוחב נצמד לאייקונים */}
<button
   onClick={() => setShowRecipesModal(true)}
   className="bg-[#be185d] hover:bg-[#9d174d] border border-[#be185d]/30 text-white h-[32px] w-[86px] rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md"
>
   <BookOpen size={14} className="shrink-0 text-white" />
   <span className="text-[10px] font-black">מתכונים</span>
</button>

</div>


                    {/* עמודה מרכזית: לוגו */}
                    <div className="flex justify-center items-center">
                      <div onClick={handleLogoClick} className="cursor-pointer active:scale-95 transition-transform flex items-center h-full">
                        <img src={siteSettings.logo_url} className="w-full max-w-[550px] md:max-w-[950px] object-contain" alt="Logo" />
                      </div>
                    </div>

                    {/* עמודה שמאלית: Mypips/שיתוף למעלה, קבוצת העדכונים למטה */}
                    <div className="flex flex-col justify-between items-end py-1 h-full">
                       <div className="flex gap-1.5">
{siteSettings.extra_button_active && (
<a 
  href={siteSettings.extra_button_url} 
  target="_blank" 
  rel="noopener noreferrer"
  // הכפתור עכשיו ב-w-auto כדי להיצמד לתוכן, עם px-1.5 למינימום רווח בצדדים
  className="flex items-center justify-center gap-1 bg-white/5 border border-white/10 px-1.5 py-1 rounded-xl text-amber-500 hover:scale-105 transition-all active:scale-95 h-[38px] w-auto min-w-[90px] relative overflow-visible shadow-lg"
>
  {/* הכלוב המעודכן: max-w-[50px] (גדול ב-20% מהקודם) */}
  <span 
    className="text-[9px] font-black leading-[1.0] text-right max-w-[50px] break-words overflow-visible"
    dangerouslySetInnerHTML={{ __html: siteSettings.extra_button_text }} 
  />

  {/* ריבוע התמונה עם ההילה - נשאר יציב ב-shrink-0 */}
  <div className="w-7 h-7 shrink-0 overflow-hidden rounded-[6px] border border-amber-500/30 bg-white/10 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/20">
    <img 
      src={siteSettings.extra_button_logo || siteSettings.logo_url} 
      className="w-full h-full object-contain p-0.5" 
      alt="Button Logo" 
    />
  </div>
</a>



                          )}
                          <button onClick={handleSiteShare} className="p-2 bg-white/5 rounded-xl border border-white/10 text-amber-500 hover:scale-110 transition-transform h-[38px]"><Share2 size={18} /></button>
                       </div>
                       

<a href={siteSettings.whatsapp_group_url} target="_blank" 
   className="bg-[#25D366] hover:bg-[#20ba5a] text-white h-[32px] px-3 rounded-xl border border-[#20ba5a]/30 text-[10px] font-black flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md whitespace-nowrap">
   <WhatsAppLogo size={14} className="animate-bounce" /> 
   קבוצת העדכונים
</a>



                    </div>
                </div>
            </div>

            {/* מסגרת קליקהדוקה וקטנה במיוחד - כל הקפסולה לחיצה */}
            <button 
                onClick={handleNavigation}
                className="border border-white/20 bg-white/5 rounded-2xl py-1 px-3 mx-auto w-fit max-w-xs backdrop-blur-sm shadow-lg flex flex-col items-center gap-0 mt-2 transition-all hover:border-white/40 hover:bg-white/10 active:scale-95 group cursor-pointer"
            >
                
                {/* 1. כותרת ראשית */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-100 leading-none text-center">
                    {siteSettings.main_title}
                </h2>

                {/* 2. כותרת משנית */}
                <p className="text-gray-200 text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-70 text-center leading-none mt-0.5">
                    {siteSettings.sub_title}
                </p>

                {/* 3. כתובת + אייקון */}
                <div className="flex items-center justify-center gap-1 mt-0.5">
                   <span className="text-slate-300 text-[10px] font-bold group-hover:text-white transition-colors border-b border-transparent group-hover:border-slate-400 leading-none">
                       {siteSettings.address}
                   </span>
                   <Navigation size={10} fill="currentColor" className="text-blue-400 group-hover:text-blue-300 transition-colors shrink-0" />
                </div>

            </button>

         {statusInfo && (
               <div className="mt-2 flex items-center justify-center gap-2 animate-in fade-in duration-1000 text-center">
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${statusInfo.color}`}>{statusInfo.text}</span>
                  <div className={`w-2 h-2 rounded-full ${statusInfo.dotBg} animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
               </div>
            )}

            {/* כפתור תתזכר אותי - קפסולה סטטית, רק הטקסט פועם */}
            {(() => {
              const now = new Date();
              const fairDays = siteSettings.fair_days || [];
              if (fairDays.length === 0) return null;

              const firstDay = Math.min(...fairDays);
              const lastDay = Math.max(...fairDays);
              const [openH, openM] = (siteSettings.opening_hour || "12:00").split(':').map(Number);
              const [closeH, closeM] = (siteSettings.closing_hour || "20:30").split(':').map(Number);

              const startDate = new Date(now);
              startDate.setDate(now.getDate() - (now.getDay() - firstDay));
              startDate.setHours(openH, openM, 0, 0);

              const endDate = new Date(now);
              endDate.setDate(now.getDate() + (lastDay - now.getDay()));
              endDate.setHours(closeH, closeM, 0, 0);

              if (now >= startDate && now <= endDate) return null;

              return (
                <div className="mt-1 flex justify-center">
                    <a 
                      href={getCalendarUrl()} 
                      target="_blank" 
                      onClick={logReminderClick} 
                      // הסרתי מפה את ה-animate-pulse-reminder
                      className="group bg-white/95 hover:bg-white text-slate-900 px-4 py-1 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    >
                        {/* הוספתי את האנימציה כאן - לטקסט בלבד */}
                        <span className="text-[10px] font-black uppercase tracking-widest animate-pulse-reminder">תתזכר אותי להזמין!</span>
                        
                        <div className="w-3.5 h-3.5 bg-slate-100 rounded-[3px] border border-slate-300 overflow-hidden flex flex-col shadow-sm">
                          <div className="h-1 bg-red-600 w-full" />
                          <div className="flex-1 flex items-center justify-center text-[7px] font-black text-slate-900 leading-none pb-0.5">
                            {getNextFairDateObj().getDate()}
                          </div>
                        </div>
                    </a>
                </div>
              );
            })()}


            <div className="flex flex-col items-center w-full sticky top-4 z-50 mt-1 gap-1 text-center">
              <div className="flex items-center justify-center gap-2 pointer-events-auto">
                {localStorage.getItem('last_successful_order') && calculateTotal() === 0 && (
                  <button 
                    onClick={handleRestoreOrder}
                    className="bg-slate-900/50 border border-slate-800 text-slate-400 font-black text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:text-amber-500 transition-all active:scale-95"
                  >
                    <RotateCcw size={12} /> הזמנה חוזרת
                  </button>
                )}

                <button 
                  onClick={() => { 
                    setCartBeforeRandom({...cart}); 
                    setShowRandomizerModal(true); 
                  }}
                  className="bg-slate-800 border border-amber-500/30 text-amber-500 px-3 py-1.5 rounded-full font-black text-[10px] flex items-center gap-1.5 hover:bg-amber-500 hover:text-[#0f172a] transition-all active:scale-95 shadow-lg"
                >
                  <Wand2 size={12} /> 
                  {Object.keys(cart).length > 0 ? "תשלים לי" : "תבחר בשבילי"}
                </button>

                {lastRandomBudget !== null && (
                  <button 
                    onClick={() => handleRandomizer(lastRandomBudget)}
                    className="bg-slate-900/50 border border-slate-800 p-1.5 rounded-full text-slate-400 hover:text-amber-500 transition-all active:scale-95"
                  >
                    <RotateCcw size={12} />
                  </button>
                )}
              </div>

              <button 
                onClick={() => setFilterGF(!filterGF)} 
                className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border transition-all active:scale-95 ${filterGF ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}
              >
                {filterGF ? 'כל המוצרים' : 'רק ללא גלוטן 🌾'}
              </button>
            </div>
          </header>



          <main className="max-w-6xl mx-auto px-12 md:px-24 pb-32 mt-4 text-center">
            {categories.filter(c => c.is_visible).map((cat, idx) => {
              const items = v.filter(p => p.category === cat.slug || (cat.slug === 'pastries' && !p.category));
              return items.length > 0 && (
                <div key={cat.id} id={cat.slug} className="mb-10 text-center scroll-mt-40 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                  <h2 className="text-center text-amber-500 font-black text-lg mb-4 flex items-center gap-4 opacity-80 tracking-widest justify-center">
                    <div className="h-[1px] bg-gradient-to-r from-transparent to-amber-500/30 flex-1"></div>
<span 
  onDoubleClick={() => setShowLoginModal(true)}
  className="flex items-center gap-2 text-center select-none cursor-default"
  title="לחיצה כפולה לכניסת מנהל"
>
  {cat.icon} {cat.name} {cat.icon}
</span>

                    <div className="h-[1px] bg-gradient-to-l from-transparent to-amber-500/30 flex-1"></div>
                  </h2>
                  {(cat.slug === 'pastries' || cat.slug === 'frozen') && (<div className="flex justify-center mb-6 text-center"><button onClick={() => setCategoryTip(cat.slug)} className="text-slate-400 font-black text-[11px] uppercase tracking-widest flex items-center gap-1.5 hover:text-amber-500 transition-all active:scale-95 text-center">{cat.slug === 'pastries' ? 'הוראות חימום' : 'הוראות אחסון'}<div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-center"><Info size={11} strokeWidth={3} /></div></button></div>)}
                  {/* --- אזור תצוגת המוצרים (גלריה או רשימה - פונטים מעודכנים) --- */}
                  <div className={viewMode === 'gallery' 
                      ? "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 px-1 text-center" 
                      : "flex flex-col gap-2 px-2 max-w-2xl mx-auto" 
                  }>
                    {items.map((p) => (
                      viewMode === 'gallery' ? (
                        // ============================================================
                        // תצוגת גלריה (רגיל)
                        // ============================================================
                        <div key={p.id} className={`bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-hidden flex flex-col shadow-xl transition-all ${p.is_sold_out ? 'grayscale opacity-40' : ''}`}>
                        <div onClick={() => setPreviewImage(p.image)} className="aspect-square w-full bg-slate-900 relative text-center cursor-zoom-in">
                          {p.is_gluten_free && <div className="absolute top-1 left-1 z-20 bg-black/60 w-5 h-5 rounded-full flex items-center justify-center text-[10px] filter drop-shadow-md" title="ללא גלוטן">🌾</div>}
                          {p.is_sold_out && <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 font-black text-white text-[10px] text-center">אזל</div>}
                          {p.is_fomo && !p.is_sold_out && <div className="absolute top-1 right-1 z-10 bg-[#0f172a] text-amber-500 border border-amber-500/40 text-[6px] md:text-[8px] px-1.5 py-0.5 rounded-full font-black animate-pulse shadow-lg text-center text-xs text-right">נשארו בודדים</div>}
                          {p.heating_instructions && !p.is_sold_out && (p.category === 'desserts' || cat.name === 'קינוחים') && (<button onClick={(e) => { e.stopPropagation(); setActiveTip(p); }} className="absolute bottom-1 left-1 z-10 bg-black/80 w-4 h-4 rounded-full text-amber-500 flex items-center justify-center shadow-md backdrop-blur-md border border-amber-500/30 text-center"><Info size={10} strokeWidth={3} /></button>)}
                          <img src={p.image} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="p-1 flex-1 flex flex-col text-center relative items-center">
                          <h3 className="font-bold text-[13px] md:text-lg leading-tight text-slate-100 text-center">{p.name}</h3>
                          {p.description && (
                            <p className="text-[9px] md:text-xs text-slate-400 mt-0.5 line-clamp-2 px-1 leading-tight text-center">
                              {p.description}
                            </p>
                          )}

                          <div className="text-amber-500 font-black text-[13px] md:text-xl my-0.5 text-center">₪{p.price}</div>
                          {p.variants && p.variants.length > 0 ? (
                            <div className="mt-auto w-full flex flex-col gap-1">
                              <button 
                                onClick={() => {
                                  setSelectedVariantProduct(p);
                                  setVariantSelections(
                                    p.variants.reduce((acc, v) => ({ ...acc, [v]: cart[`${p.id}__${v}`] || 0 }), {})
                                  );
                                  setShowVariantModal(true);
                                }}
                                className={`w-full py-2 rounded-lg font-black text-sm transition-all shadow-lg active:scale-95 ${Object.keys(cart).some(k => k.startsWith(`${p.id}__`)) ? 'bg-amber-500 text-[#0f172a]' : 'bg-slate-700 text-amber-500 border border-amber-500/30'}`}
                              >
                                {Object.keys(cart).some(k => k.startsWith(`${p.id}__`)) ? 'ערוך בחירה' : 'בחר'}
                              </button>
                              {Object.entries(cart).filter(([key]) => key.startsWith(`${p.id}__`)).map(([key, qty]) => (
                                <div key={key} className="text-[9px] font-bold text-amber-400/80 bg-slate-900/50 rounded-md py-0.5 px-1 flex justify-between animate-in fade-in">
                                  <span>{key.split('__')[1]}</span>
                                  <span>{qty} יח'</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className={`mt-auto flex items-center justify-between rounded-lg p-0.5 border border-slate-700/30 w-full ${p.is_sold_out ? 'opacity-20 pointer-events-none' : 'bg-slate-900/40'} text-center`}>
                              <button onClick={() => updateQty(p.id, -1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-slate-700/50 rounded-md hover:bg-slate-600 transition-all text-center"><Minus size={12} /></button>
                              <span className={`text-[11px] md:text-base font-black ${cart[p.id] > 0 ? 'text-amber-500' : 'text-slate-500 text-center'}`}>{cart[p.id] || 0}</span>
                              <button 
                                onClick={() => updateQty(p.id, 1)} 
                                disabled={(() => {
                                  if (p.stock !== null && (cart[p.id] || 0) >= p.stock) return true;
                                  const now = new Date();
                                  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                                  const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;
                                  if (isSale && siteSettings.sale_categories?.includes(p.category || 'pastries') && p.sale_stock !== null) {
                                    return (cart[p.id] || 0) >= p.sale_stock;
                                  }
                                  return false;
                                })()}
                                className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md transition-all shadow-inner ${
                                  (() => {
                                    const now = new Date();
                                    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                                    const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;
                                    const isOutOfStock = (p.stock !== null && (cart[p.id] || 0) >= p.stock);
                                    const isSaleOutOfStock = (isSale && siteSettings.sale_categories?.includes(p.category || 'pastries') && p.sale_stock !== null && (cart[p.id] || 0) >= p.sale_stock);

                                    if (isOutOfStock || isSaleOutOfStock) {
                                      return 'bg-slate-700 opacity-40 cursor-not-allowed';
                                    }
                                    return 'bg-amber-600 active:bg-amber-500';
                                  })()
                                }`}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      ) : (
                        // ============================================================
                        // תצוגת רשימה (מחיר גדול יותר, שם מוצר קטן יותר)
                        // ============================================================
                        <div key={p.id} className={`bg-slate-800/40 rounded-xl border border-slate-700/50 py-0.5 px-2 flex items-center justify-between gap-3 shadow-sm transition-all ${p.is_sold_out ? 'grayscale opacity-40' : ''}`}>
                           
                           {/* צד ימין: תמונה וטקסט */}
                           <div className="flex items-center gap-3 flex-1 min-w-0">
                               <div onClick={() => setPreviewImage(p.image)} className="relative w-8 h-8 shrink-0 cursor-zoom-in">
                                  <img src={p.image} className="w-full h-full object-cover rounded-lg bg-slate-900 border border-slate-700" loading="lazy" />
                                  {p.is_gluten_free && <div className="absolute -top-1 -right-1 z-20 bg-black/80 w-4 h-4 rounded-full flex items-center justify-center text-[8px] border border-slate-700">🌾</div>}
                                  {p.is_fomo && !p.is_sold_out && <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-[#0f172a] text-[7px] font-black text-center leading-3 rounded-b-lg">בודדים</div>}
                               </div>

                               <div className="flex flex-col text-right min-w-0">
                                  {/* שם מוצר - הוקטן ל-text-xs */}
                                  <span className="font-bold text-xs text-slate-100 leading-none">{p.name}</span>
                                  {p.description && <p className="text-[10px] text-slate-400 leading-tight mt-1">{p.description}</p>}
                                  
                                  {Object.entries(cart).filter(([key]) => key.startsWith(`${p.id}__`)).length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {Object.entries(cart).filter(([key]) => key.startsWith(`${p.id}__`)).map(([key, qty]) => (
                                         <span key={key} className="text-[8px] bg-slate-900 px-1.5 rounded text-amber-500/80 font-bold border border-slate-700">{key.split('__')[1]}: {qty}</span>
                                      ))}
                                    </div>
                                  )}
                               </div>
                           </div>

                           {/* צד שמאל: מחיר + כפתורים (בתוך קונטיינר מיושר) */}
                           <div className="shrink-0 flex items-center gap-2 pl-1">
                              {/* המחיר - הוגדל חזרה ל-text-sm */}
                              <span className="text-amber-500 font-black text-sm whitespace-nowrap">₪{p.price}</span>

                              {/* קונטיינר קבוע לכפתורים - שומר על המחיר במקום קבוע */}
                              <div className="w-[80px]">
                                  {p.variants && p.variants.length > 0 ? (
                                    <button 
                                      onClick={() => {
                                        setSelectedVariantProduct(p);
                                        setVariantSelections(p.variants.reduce((acc, v) => ({ ...acc, [v]: cart[`${p.id}__${v}`] || 0 }), {}));
                                        setShowVariantModal(true);
                                      }}
                                      className={`w-full py-1.5 rounded-lg font-black text-[10px] border active:scale-95 transition-all ${Object.keys(cart).some(k => k.startsWith(`${p.id}__`)) ? 'bg-amber-500 border-amber-500 text-[#0f172a]' : 'bg-slate-700/50 border-slate-600 text-amber-500'}`}
                                    >
                                      {Object.keys(cart).some(k => k.startsWith(`${p.id}__`)) ? 'ערוך' : 'בחר'}
                                    </button>
                                  ) : (
                                    <div className={`flex items-center gap-1 w-full bg-slate-900/50 rounded-lg p-0.5 border border-slate-700/50 ${p.is_sold_out ? 'opacity-20 pointer-events-none' : ''}`}>
                                      <button onClick={() => updateQty(p.id, -1)} className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded-md text-white active:scale-90 transition-all"><Minus size={12}/></button>
                                      <span className={`font-black text-sm flex-1 text-center ${cart[p.id] > 0 ? 'text-amber-500' : 'text-slate-500'}`}>{cart[p.id] || 0}</span>
                                      <button 
                                        onClick={() => updateQty(p.id, 1)} 
                                        disabled={(() => {
                                            if (p.stock !== null && (cart[p.id] || 0) >= p.stock) return true;
                                            const now = new Date();
                                            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                                            const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;
                                            if (isSale && siteSettings.sale_categories?.includes(p.category || 'pastries') && p.sale_stock !== null) {
                                                return (cart[p.id] || 0) >= p.sale_stock;
                                            }
                                            return false;
                                        })()}
                                        className={`w-7 h-7 flex items-center justify-center rounded-md text-white active:scale-90 transition-all ${
                                            (() => {
                                                const now = new Date();
                                                const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                                                const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;
                                                const isOutOfStock = (p.stock !== null && (cart[p.id] || 0) >= p.stock);
                                                const isSaleOutOfStock = (isSale && siteSettings.sale_categories?.includes(p.category || 'pastries') && p.sale_stock !== null && (cart[p.id] || 0) >= p.sale_stock);

                                                if (isOutOfStock || isSaleOutOfStock) {
                                                    return 'bg-slate-800 cursor-not-allowed opacity-50';
                                                }
                                                return 'bg-amber-600';
                                            })()
                                        }`}
                                      ><Plus size={12}/></button>
                                    </div>
                                  )}
                              </div>
                           </div>
                        </div>
                      )
                    ))}
                  </div>


                </div>
              );
            })}

            {/* אזהרת אלרגנים חדשה */}
            <div className="mt-16 mb-8 flex items-center justify-center gap-3 text-red-500 font-black text-[11px] md:text-sm bg-red-500/5 py-5 px-4 rounded-[2rem] border border-red-500/20 max-w-md mx-auto animate-in fade-in duration-1000">
               <AlertCircle size={20} className="shrink-0 animate-pulse text-red-600" />
               <span className="leading-relaxed">
                  כל המוצרים טבעונים ב-100% 🌱
                  <br />
                  אך עלולים להכיל אלרגנים מכל סוג
               </span>
             <AlertCircle size={20} className="shrink-0 animate-pulse text-red-600" />
            </div>
          </main>

          {showPickupModal && (
            <div className="fixed inset-0 z-[700] flex justify-center items-start pt-[10vh] bg-black/90 backdrop-blur-xl animate-in fade-in p-4 overflow-y-auto">
              <div className="bg-slate-900 border-2 border-green-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative m-auto">
                <ShoppingBag className="mx-auto text-green-500 mb-4 text-center" size={48} />
                <h3 className="text-xl font-black mb-6 text-white text-center">איך תרצו לקבל את ההזמנה?</h3>

                <div className="space-y-4 mb-8 text-center">
                  <div className="relative text-right">
                    <label className="block text-right text-[10px] font-bold text-slate-500 mr-2 mb-1">השם שלך:</label>
                    <div className="relative">
                      <User className="absolute right-4 top-4 text-slate-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="רשמו שם מלא" 
                        className="w-full bg-slate-800 border-2 border-slate-700 p-4 pr-12 rounded-2xl text-center text-lg text-white outline-none focus:border-green-500 font-bold" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                      />
                    </div>
                  </div>

                  {/* כפתורי בחירה */}
<div className="flex flex-wrap justify-center gap-2 mb-8">
  {orderOptions.map((option) => {
    const isSelected = selectedOrderOption?.id === option.id;
    // הפעימה תפעל רק אם: הכפתור לא נבחר וגם לא נבחרה אף אופציה אחרת עדיין
    const shouldPulse = !isSelected && !selectedOrderOption;

    return (
      <button 
        key={option.id}
        onClick={() => setSelectedOrderOption(option)}
        className={`flex-1 min-w-[100px] min-h-[110px] rounded-2xl border-2 transition-all flex flex-col items-center justify-center p-2 relative shadow-md active:scale-95 ${
         isSelected 
            ? 'bg-green-600 border-white text-white ring-4 ring-green-500/20 z-10 scale-105' 
            : `bg-white border-slate-200 text-[#0f172a] ${shouldPulse ? 'animate-pulse-soft' : ''}`
        }`}
      >
        {/* אייקון עליון */}
        <div className={`mb-1.5 p-1.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
          {option.is_pickup ? <MapPin size={16} /> : <ShoppingBag size={16} />}
        </div>

{/* שם האופציה */}
<span className="text-[10px] md:text-xs font-black leading-[1.1] mb-1 px-1 break-words">
  {option.is_pickup ? `איסוף מ${siteSettings.main_title}` : option.label}
</span>



        {/* מחיר בתחתית */}
        <span className={`text-[9px] font-bold ${isSelected ? 'text-white/90' : 'text-green-600'}`}>
          {option.cost > 0 ? `+ ₪${option.cost}` : 'חינם'}
        </span>

        {/* חיווי V קטן כשנבחר */}
        {isSelected && (
          <div className="absolute top-1 right-1 bg-white text-green-600 rounded-full p-0.5 shadow-sm">
            <Plus size={8} className="rotate-45" />
          </div>
        )}
      </button>
    );
  })}
</div>


                  {/* הצגת שעת איסוף רק אם נבחר כפתור איסוף */}
                  {selectedOrderOption?.is_pickup && (
                    <div className="relative text-right animate-in slide-in-from-top-4">
                      <label className="block text-right text-[10px] font-bold text-slate-500 mr-2 mb-1">באיזו שעה תגיעו ליריד?</label>
                      <div className="relative group text-right">
                        <Clock className="absolute right-4 top-4 text-slate-500 z-10" size={18} />
<input 
  type="time" 
  className="w-full bg-slate-800 border-2 border-slate-700 p-4 pr-12 rounded-2xl text-center text-2xl text-green-400 outline-none focus:border-green-500 font-bold appearance-none relative z-0" 
  value={pickupTime} 
  // הגדרת טווח השעות לפי וואטסאפ
  min={siteSettings.whatsapp_opening_hour || siteSettings.opening_hour || "12:00"}
  max={siteSettings.whatsapp_closing_hour || siteSettings.closing_hour || "20:30"}
  onChange={(e) => {
    const selectedTime = e.target.value;
    const minW = siteSettings.whatsapp_opening_hour || siteSettings.opening_hour || "12:00";
    const maxW = siteSettings.whatsapp_closing_hour || siteSettings.closing_hour || "20:30";

    if (selectedTime < minW) {
      alert(`שימו לב: ניתן לאסוף רק החל משעה ${minW}`);
      setPickupTime(minW);
    } else if (selectedTime > maxW) {
      alert(`שימו לב: האיסוף מסתיים בשעה ${maxW}`);
      setPickupTime(maxW);
    } else {
      setPickupTime(selectedTime);
    }
  }} 
  required 
/>

<p className="text-base text-center text-red-500 mt-4 font-black flex items-center justify-center gap-2 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] animate-in fade-in duration-500">
  <AlertCircle size={18} className="shrink-0" />
  <span>
    ניתן לבחור בין {siteSettings.whatsapp_opening_hour || siteSettings.opening_hour} ל-{siteSettings.whatsapp_closing_hour || siteSettings.closing_hour}
  </span>
  <AlertCircle size={18} className="shrink-0" />
</p>



                      </div>
                    </div>
                  )}

                  {/* קוד קופון */}
                  {siteSettings.coupon_active && (
                    <div className="bg-purple-900/10 border border-purple-500/30 p-4 rounded-2xl">
                       <input 
                        className="w-full bg-slate-900 border-2 border-slate-800 p-3 rounded-xl text-center text-white outline-none focus:border-purple-500 font-black" 
                        value={appliedCoupon} 
                        onChange={e => setAppliedCoupon(e.target.value)} 
                        placeholder="יש קוד קופון?" 
                      />
                    </div>
                  )}

                  {/* סה"כ לתשלום מתעדכן */}
                  <div className="pt-2">
                     <p className="text-[10px] font-bold text-slate-500">סה"כ לתשלום (כולל הכל):</p>
                     <p className="text-2xl font-black text-green-500">₪{getFinalTotal()}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-center">
                  <button 
                    disabled={!customerName || !selectedOrderOption || (selectedOrderOption.is_pickup && !pickupTime)}
                    onClick={finalizeOrder} 
                    className="w-full bg-green-600 disabled:opacity-50 text-white py-4 rounded-full font-black text-lg shadow-lg active:scale-95 transition-all text-center"
                  >
                    אישור ושליחת וואטסאפ
                  </button>
                  <button onClick={() => {setShowPickupModal(false); setSelectedOrderOption(null);}} className="w-full bg-slate-800 text-slate-400 py-3 rounded-full font-bold text-sm text-center">חזרה לסל</button>
                </div>
              </div>
            </div>
          )}

          {/* Golden Pastry Win Modal */}
          {showGoldenModal && (
            <div className="fixed inset-0 z-[900] flex items-center justify-center px-6 bg-black/95 backdrop-blur-xl animate-in fade-in text-center">
              <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[3rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(40)].map((_, i) => (
                    <div 
                      key={i} 
                      className="confetti-new" 
                      style={{ 
                        left: `${Math.random() * 100}%`,
                        top: `-10%`,
                        '--x': `${(Math.random() - 0.5) * 400}px`,
                        '--y': `${Math.random() * 500 + 200}px`,
                        '--r': `${Math.random() * 1000}deg`,
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        backgroundColor: ['#f59e0b', '#fbbf24', '#ffffff', '#fb7185', '#60a5fa'][i % 5],
                        animationDelay: `${Math.random() * 0.5}s`
                      }} 
                    />
                  ))}
                </div>

                <div className="bg-gradient-to-tr from-amber-600 to-yellow-400 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                    <Trophy className="text-white" size={48} />
                </div>
                <h3 className="text-3xl font-black mb-2 text-white">זכית במאפה בחינם! ✨</h3>
                <p className="text-slate-300 font-bold mb-8">
                  הגעת בדיוק למאפה ה-{siteSettings.golden_pastry_target} שנמכר היום! <br/>
                  המאפה הזול בסל שלך ({goldenWinnerItem?.name}) עלינו.
                </p>
                <button 
                  onClick={() => { 
                      // 1. שליחת ההודעה לוואטסאפ (עם הקישור השמור)
                      if (pendingWhatsappLink) {
                          window.open(pendingWhatsappLink, '_blank');
                      }
                      
                      // 2. סגירה וניקוי המערכת
                      setShowGoldenModal(false); 
                      setGoldenWinnerItem(null); 
                      setShowThankYouModal(true);
                      
                      // איפוס מלא של הסל
                      setCart({});
                      setShowBoxAlert(false);
                      localStorage.removeItem('lior_active_cart');
                      setIsDiscountActive(false);
                      localStorage.removeItem('lior_discount_active');
                      localStorage.removeItem('lior_discount_type');
                      setSelectedOrderOption(null);
                      setAppliedCoupon(""); 
                  }}
                  className="w-full bg-amber-500 text-[#0f172a] py-4 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-all text-center shimmer-effect"
                >
                  איזה כיף! שלח את ההזמנה לוואטסאפ 🎁
                </button>


              </div>
            </div>
          )}

          {/* Randomizer Modal */}
          {showRandomizerModal && (
            <div className="fixed inset-0 z-[700] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl">
              <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative">
                <button onClick={() => setShowRandomizerModal(false)} className="absolute top-6 left-6 text-slate-500"><X size={20}/></button>
                < Wand2 className="mx-auto text-amber-500 mb-4" size={48} />
                <h3 className="text-xl font-black mb-2 text-white">נרכיב לך שקית הפתעות?</h3>
                <p className="text-slate-400 text-sm mb-6">רשום לנו מה התקציב שלך, ואנחנו נבחר בשבילך מיקס של דברים טובים!</p>

                <input 
                  type="number" 
                  inputMode="numeric"
                  placeholder="כמה בא לך להשקיע? (₪)"
                  className="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-2xl text-center text-2xl text-amber-500 outline-none focus:border-amber-500 mb-6 font-bold"
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                />

<button 
  onClick={() => handleRandomizer()} // <--- ככה זה צריך להיראות עכשיו
  disabled={!budget}
  className="w-full bg-amber-500 text-[#0f172a] py-4 rounded-full font-black text-lg active:scale-95 transition-all disabled:opacity-50"
>
  בחר בשבילי!
</button>

              </div>
            </div>
          )}

          {showThankYouModal && (
            <div className="fixed inset-0 z-[900] flex items-center justify-center px-6 bg-black/95 backdrop-blur-xl animate-in fade-in text-center">
              <div className="bg-slate-900 border-2 border-pink-500/50 p-8 rounded-[3rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative border-t-pink-500 border-b-amber-500 overflow-y-auto max-h-[95vh]">
                <div className="bg-gradient-to-tr from-pink-500 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/20 text-center">
                    <Trophy className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-black mb-1 text-white">תודה שהזמנת</h3>
                <h4 className="text-lg font-black mb-6 text-amber-500 text-center">Lior Ben Moshe</h4>

                <div className="space-y-4 mb-8">
                  {/* Instagram Story Block - עם הורדת תמונה ושיתוף קובץ */}
                  <div className="bg-slate-800/50 p-5 rounded-[2rem] border border-slate-700 text-center relative overflow-hidden">
                      
                      {/* הודעה מעוצבת להעתקה */}
                      {copyNotification && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
                           <div className="flex flex-col items-center gap-2">
                              <div className="bg-green-500/20 p-2 rounded-full text-green-500"><Copy size={20} /></div>
                              <span className="text-white font-black text-sm">{copyNotification}</span>
                           </div>
                        </div>
                      )}

                      <p className="text-slate-200 font-bold text-sm mb-1 leading-relaxed text-center">
                          שתפו בסטורי שאתם מסודרים ותייגו אותי:<br/>
                          <span className="text-pink-500 font-black text-lg">@{siteSettings.instagram_username}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 mb-4 font-bold">(יועתק לכם אוטומטית ללוח)</p>
                      
                      <button 
                          disabled={isSharing}
                          onClick={async () => {
                              try {
                                  setIsSharing(true); // מתחיל טעינה

                                  // 1. העתקת השם ללוח
                                  if (siteSettings.instagram_username) {
                                      const handle = siteSettings.instagram_username.startsWith('@') ? siteSettings.instagram_username : `@${siteSettings.instagram_username}`;
                                      await navigator.clipboard.writeText(handle);
                                      setCopyNotification(`התיוג ${handle} הועתק!`);
                                      setTimeout(() => setCopyNotification(null), 2500);
                                  }

                                  // 2. הורדת התמונה והמרתה לקובץ (Blob)
                                  if (siteSettings.story_image_url && navigator.share) {
                                      const response = await fetch(siteSettings.story_image_url);
                                      const blob = await response.blob();
                                      const file = new File([blob], "story-image.jpg", { type: "image/jpeg" });

                                      // 3. שיתוף הקובץ עצמו (פותח את תפריט השיתוף של הטלפון)
                                      if (navigator.canShare && navigator.canShare({ files: [file] })) {
                                          await navigator.share({
                                              files: [file],
                                              title: 'שיתוף סטורי',
                                              text: '' // משאירים ריק כדי לא להפריע לתמונה
                                          });
                                      } else {
                                          throw new Error("Sharing not supported");
                                      }
                                  } else {
                                      // מחשב/דפדפן ישן - פתיחת קישור
                                      window.open(siteSettings.story_image_url, '_blank');
                                  }
                              } catch (error) {
                                  console.error("Share failed:", error);
                                  // במקרה של שגיאה (למשל תמונה חסומה) - פתיחת הלינק כגיבוי
                                  window.open(siteSettings.story_image_url, '_blank');
                              } finally {
                                  setIsSharing(false); // סיום טעינה
                              }
                          }}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-3 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all text-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                          {isSharing ? (
                              <span className="animate-pulse">מכין את התמונה...</span>
                          ) : (
                              <> <Instagram size={24} /> שתף בסטורי </>
                          )}
                      </button>
                  </div>


                  {/* Facebook Groups Block */}
                  <div className="bg-slate-800/50 p-5 rounded-[2rem] border border-slate-700 text-center">
                      <p className="text-slate-200 font-bold text-sm mb-4 leading-relaxed text-center">
                          תפרגנו לי גם בקבוצות הפייסבוק:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { name: 'טבעוני טעים', url: 'https://www.facebook.com/share/g/14Xk87iSKcX/' },
                          { name: 'אוכלים טבעוני', url: 'https://www.facebook.com/share/g/1Fik8jwCLf/' },
                          { name: 'טבעוניות אוכלות בחוץ', url: 'https://www.facebook.com/share/g/1ANA3tyxSS/' }
                        ].map(group => (
                            <a key={group.name} href={group.url} target="_blank" className="flex items-center justify-between w-full bg-slate-900/80 p-3 rounded-xl border border-white/5 hover:border-blue-500 transition-all active:scale-95 group">
                               <div className="flex items-center gap-2">
                                  <Facebook className="text-blue-500" size={16} />
                                  <span className="text-[11px] font-black text-white">{group.name}</span>
                               </div>
                               <ExternalLink size={12} className="text-slate-600 group-hover:text-blue-400" />
                            </a>
                        ))}
                      </div>
                  </div>
                </div>

<button 
    onClick={() => {
        setShowThankYouModal(false);
        // שורת הניקוי:
        window.history.replaceState({}, '', window.location.pathname);
    }}  
                   className="text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors text-center pb-2"
                >
                    סגור
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {activeTip && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm animate-in fade-in text-center">
          <div className="bg-slate-900 border-2 border-amber-500/50 p-6 rounded-[2rem] shadow-2xl max-w-sm w-full text-center relative animate-in zoom-in">
            <button onClick={() => setActiveTip(null)} className="absolute top-4 left-4 text-slate-500 hover:text-white"><X size={20} /></button>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="bg-amber-500/20 p-3 rounded-full text-amber-500 shadow-inner text-center"><Cookie size={32} /></div>
              <h3 className="text-lg font-black text-amber-500 text-center">המלצת השף 🍪</h3>
              <p className="text-gray-200 leading-relaxed font-bold text-sm bg-slate-800/50 p-4 rounded-2xl border border-slate-700 w-full overflow-y-auto max-h-[40vh] whitespace-pre-wrap text-center">{activeTip.heating_instructions}</p>
              <button onClick={() => setActiveTip(null)} className="mt-2 w-full bg-amber-600 text-white py-3 rounded-xl font-black shadow-lg active:scale-95 transition-all text-center">הבנתי, תודה!</button>
            </div>
          </div>
        </div>
      )}

      {categoryTip && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm animate-in fade-in text-center">
          <div className="bg-slate-900 border-2 border-amber-500/50 p-6 rounded-[2rem] shadow-2xl max-sm w-full text-center relative animate-in zoom-in">
            <button onClick={() => setCategoryTip(null)} className="absolute top-4 left-4 text-slate-500 hover:text-white"><X size={20} /></button>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="bg-amber-500/20 p-3 rounded-full text-amber-500 shadow-inner text-center">{categoryTip === 'pastries' ? <Flame size={32} /> : <Snowflake size={32} />}</div>
              <h3 className="text-lg font-black text-amber-500 text-center">{categoryTip === 'pastries' ? 'הוראות חימום 🥐' : 'הוראות אחסון ❄️'}</h3>
              <div className="text-gray-200 leading-relaxed font-bold text-sm bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full whitespace-pre-wrap text-center">
                {categoryTip === 'pastries' ? (<><div className="text-xs text-center">לחמם בתנור/טוסטר אובן/נינג'ה על 150 מעלות <br />5-10 דקות.<br />להמנע מחימום במיקרו!<br /></div><br /><span className="text-yellow-400 font-bold text-center">*אם לא אוכלים באותו יום,<br />ניתן להקפיא כחודשיים*</span></>) : (<div className="text-center">אם אתם לוקחים הביתה <br />אנא הצטיידו בצידנית וקרחונים.</div>)}
              </div>
              <button onClick={() => setCategoryTip(null)} className="mt-2 w-full bg-amber-600 text-white py-3 rounded-xl font-black shadow-lg active:scale-95 transition-all text-center">הבנתי, תודה!</button>
            </div>
          </div>
        </div>
      )}

{showDayWarning && (
  <div className="fixed inset-0 z-[600] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl animate-in fade-in text-center">
    <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative">
      <AlertCircle className="mx-auto text-amber-500 mb-4 text-center" size={48} />
      <h3 className="text-xl font-black mb-6 text-white leading-tight text-center whitespace-pre-line">
          רצוי לא להזמין כרגע
          {"\n"}תעקבו, נתראה ביריד הבא
      </h3>
      
      <div className="flex flex-col gap-4 text-center">
        {/* שורת הכפתורים המעוצבים */}
        <div className="grid grid-cols-2 gap-3">
          {/* כפתור תתזכר אותי עם אייקון תאריך דינמי */}
          <a 
            href={getCalendarUrl()} 
            target="_blank" 
            onClick={() => {
              logReminderClick();
              setShowDayWarning(false);
            }}
            className="bg-white text-[#0f172a] py-4 rounded-2xl font-black text-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-1 shadow-lg"
          >
            <span className="leading-none">תתזכר אותי!</span>
            <div className="w-5 h-5 bg-slate-100 rounded-[4px] border border-slate-300 overflow-hidden flex flex-col shadow-sm">
              <div className="h-1.5 bg-red-600 w-full" />
              <div className="flex-1 flex items-center justify-center text-[9px] font-black text-slate-900 leading-none pb-0.5">
                {getNextFairDateObj().getDate()}
              </div>
            </div>
          </a>

          {/* כפתור שלח בכל זאת */}
          <button 
            onClick={() => { 
              setShowDayWarning(false); 
              setShowPickupModal(true); 
            }} 
            className="bg-amber-500 text-[#0f172a] py-4 rounded-2xl font-black text-sm active:scale-95 transition-all flex items-center justify-center"
          >
            שלח בכל זאת
          </button>
        </div>

        {/* כפתור חזרה לאתר כלינק טקסט בלבד */}
        <button 
          onClick={() => setShowDayWarning(false)} 
          className="text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-300 transition-colors py-2"
        >
          חזרה לאתר
        </button>
      </div>
    </div>
  </div>
)}



      {showEmptyCartModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl animate-in fade-in text-center">
          <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative">
            <ShoppingCart className="mx-auto text-amber-500 mb-4 text-center" size={48} />
            <h3 className="text-xl font-black mb-6 text-white leading-tight text-center">לא בחרת פריטים לשמירה</h3>
            <button onClick={() => setShowEmptyCartModal(false)} className="w-full bg-amber-500 text-[#0f172a] py-4 rounded-full font-black text-lg active:scale-95 transition-all text-center">חזור לחנות</button>
          </div>
        </div>
      )}

      {showDiscountModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl text-center">
          <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative">
            <Gift className="mx-auto text-amber-500 mb-4 animate-bounce text-center" size={48} />
            <h3 className="text-xl font-black mb-6 text-white text-center">גילית סוד! ✨</h3>
            <div className="mb-8 space-y-2 text-center">
              <p className="text-amber-500 font-black text-lg text-center">
                {siteSettings.reward_type === '12_percent' ? 'קיבלת 12% הנחה סודית!' : 
                  siteSettings.reward_type === '5_percent' ? 'קיבלת 5% הנחה סודית!' :
                  'קיבלת מאפה שישי במתנה!'}
                <br/>המשיכו להזמנה
              </p>
              {siteSettings.reward_type === '12_percent' && (
                <p className="text-slate-400 text-[10px] font-bold text-center">*אין כפל מבצעים*</p>
              )}
            </div>
            <button onClick={() => setShowDiscountModal(false)} className="w-full bg-amber-500 text-[#0f172a] py-4 rounded-full font-black text-lg text-center">תודה!</button>
          </div>
        </div>
      )}

      {showAlreadyActiveModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl text-center">
          <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative">
            <div className="mx-auto bg-amber-500/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Zap className="text-amber-500 animate-pulse" size={40} />
            </div>
            <h3 className="text-xl font-black mb-4 text-white text-center">ההטבה כבר הופעלה! ✨</h3>
            <div className="mb-8 text-center">
              <p className="text-slate-400 text-sm font-bold text-center">ההטבה שלך מחכה בסל הקניות:</p>
              <p className="text-amber-500 font-black text-xs mt-2 text-center uppercase tracking-widest">
                {siteSettings.reward_type === '12_percent' ? '12% הנחה' : 
                  siteSettings.reward_type === '5_percent' ? '5% הנחה' :
                  'מאפה שישי במתנה'}
              </p>
            </div>
            <button onClick={() => setShowAlreadyActiveModal(false)} className="w-full bg-amber-500 text-[#0f172a] py-4 rounded-full font-black text-lg text-center">המשך להזמנה</button>
          </div>
        </div>
      )}


      {/* חלונית תמונה מוגדלת (Lightbox) - נסגרת בכל לחיצה */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
        >
          <button className="absolute top-6 left-6 text-white/70 bg-white/10 p-3 rounded-full backdrop-blur-md transition-all">
            <X size={28} />
          </button>

          <div className="relative max-w-4xl w-full h-full flex items-center justify-center p-2">
            <img 
              src={previewImage} 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-in zoom-in duration-300"
              alt="Product Preview"
            />
          </div>
        </div>
      )}

      {showPastryWarning && (
        <div className="fixed inset-0 z-[850] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(245,158,11,0.3)] max-sm w-full animate-in zoom-in text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
               <ShoppingBasket className="text-amber-500 animate-bounce" size={32} />
            </div>
            <h3 className="text-2xl font-black mb-2 text-white italic">רגע! חבל לפספס...</h3>
            <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700 mb-6">
               <p className="text-slate-300 font-bold text-lg leading-relaxed text-center">
                  בחרת <span className="text-amber-500 text-2xl font-black">{totalPastriesInCart}</span> מאפים.
                  <br />
                  נשארו לך רק עוד <span className="text-white text-2xl font-black underline decoration-amber-500">{(6 - (totalPastriesInCart % 6)) % 6}</span> מאפים
                  <br />
                  כדי לקבל את המאפה הבא <span className="text-amber-500 font-black text-center">במתנה! 🎁</span>
               </p>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => setShowPastryWarning(false)} className="w-full bg-amber-500 hover:bg-amber-400 text-[#0f172a] py-4 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all text-center shimmer-effect">
                הוסף מאפים וקבל מתנה! 🥐
              </button>
              <button onClick={() => { setShowPastryWarning(false); continueToOrderDetails(); }} className="w-full py-2 text-slate-500 font-bold text-xs hover:text-white transition-colors text-center">
                אני מוותר על המתנה, המשך בכל זאת
              </button>
            </div>
          </div>
        </div>
      )}

      {showBackToTop && (<div className="fixed bottom-6 right-4 z-[100] text-center"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-slate-800/80 border border-slate-700 p-3 rounded-full text-amber-500 shadow-2xl active:scale-90 animate-in zoom-in text-center flex items-center justify-center"><ArrowUp size={24} /></button></div>)}

      {!isAdmin && (
        <div className="fixed bottom-6 left-0 z-[100] flex flex-col items-start gap-3 w-fit max-w-fit pointer-events-none">
{/* חץ בוהק - צמוד לקצה שמאל ומצביע מקרוב */}
    {calculateTotal() > 0 && (
      <div className="fixed bottom-24 left-1 z-[200] pointer-events-none animate-in fade-in duration-1000">
        <div className="flex flex-col items-center" style={{ animation: 'arrow-float 2s infinite ease-in-out, arrow-glow-green 2s infinite ease-in-out' }}>
          <ArrowDown 
            size={40} 
            className="text-green-500 fill-green-500/20" 
            strokeWidth={3}
          />
        </div>
      </div>
)}
          <button 
            onClick={handleWhatsAppClick} 
            className={`shimmer-effect bg-green-600 text-white left-0 rounded-r-xl rounded-l-none shadow-2xl flex flex-col items-center justify-center gap-0.5 border-y border-r border-white/10 active:scale-95 pointer-events-auto w-[50px] py-1.5 px-0.5 ${pulse ? 'glow-active shadow-[0_0_15px_rgba(34,197,94,0.4)]' : ''} ${isWobbling ? 'animate-wobble' : ''}`}
          >
            {/* לוגו בגודל 16 */}
            <WhatsAppLogo size={16} className={pulse ? "animate-bounce" : ""} />
            
            <div className="flex flex-col items-center leading-none text-center w-full overflow-hidden">
              <span className="text-[11px] font-black uppercase tracking-tighter block whitespace-nowrap">תשמור</span>
              <span className="text-[11px] font-black uppercase tracking-tighter block whitespace-nowrap">לי</span>
              
              {calculateTotal() > 0 && (
                <div className="flex flex-col items-center justify-center mt-0.5 w-full">
                  {(() => {
                    const finalPrice = getFinalTotal();
                    let originalPrice = calculateTotal();
                    if (selectedOrderOption) originalPrice += selectedOrderOption.cost;
                    
                    // --- לוגיקת אימוג'ים (ללא שינוי) ---
                    let statusIcon = null;

                    if (siteSettings.threshold_promo_active && calculateTotal() >= siteSettings.threshold_promo_limit) {
                        statusIcon = <span className="text-[8px] animate-bounce">🎁</span>;
                    } 
                    else {
                        const now = new Date();
                        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                        const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;
                        
                        if (isSale || isCouponValid() || isDiscountActive) {
                            statusIcon = <span className="text-[8px] text-red-300 animate-pulse">🔥</span>;
                        }
                    }

                    // --- תצוגת מחיר ---
                    if (finalPrice < originalPrice) {
                      return (
                        <>
                          <div className="flex items-center justify-center gap-0.5 w-full">
                               {statusIcon} 
                               {/* שינוי: הגדלתי את הפונט ל-10px */}
                               <span className="text-[10px] font-mono font-bold leading-none">₪{finalPrice}</span>
                          </div>
                          {/* מחיר ישן - אדום כהה */}
                          <span className="text-[8px] font-mono font-bold leading-none text-red-900 line-through opacity-80">₪{originalPrice}</span>
                        </>
                      );
                    }
                    
                    // מחיר רגיל
                    return (
                        <div className="flex items-center justify-center gap-0.5 w-full">
                            {statusIcon}
                            {/* שינוי: הגדלתי את הפונט ל-10px */}
                            <span className="text-[10px] font-mono font-bold leading-none">₪{finalPrice}</span>
                        </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </button>
        </div>
      )}

      <footer className="py-16 text-center">
        <button onClick={() => setShowLoginModal(true)} className="opacity-0 w-20 h-10 select-none cursor-default">Settings</button>
      </footer>

      {showLoginModal && (
        // שינוי: הורדתי את pt-[25vh] ל-pt-24 והוספתי items-start
        // ככה זה יושב גבוה במסך והמקלדת לא עולה על זה
        <div className="fixed inset-0 z-[600] flex justify-center items-start pt-24 bg-black/90 backdrop-blur-xl animate-in fade-in p-4">
          <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-sm w-full animate-in zoom-in text-center relative m-auto">
            <Lock className="mx-auto text-amber-500 mb-4 text-center" size={40} />
            <h3 className="text-xl font-black mb-6 text-white text-center">קוד מנהל</h3>
            <input 
              type="password" 
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full bg-slate-800 border-2 border-slate-700 p-4 rounded-2xl text-center text-xl text-amber-500 outline-none focus:border-amber-500 mb-6 font-bold text-center" 
              value={loginPass}
                           onFocus={(e) => {
                setTimeout(() => {
                  e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
              }}
              onChange={e => {
                const val = e.target.value;
                setLoginPass(val);
                if (val === siteSettings.password) {
                  setIsAdmin(true);
                  setShowLoginModal(false);
                  setLoginPass("");
                  localStorage.setItem('lior_admin_device', 'true');
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                }
              }} 
              autoFocus 
            />
            <div className="flex gap-3 text-center">
              <button onClick={handleLogin} className="flex-1 bg-amber-500 text-[#0f172a] py-4 rounded-full font-black text-lg active:scale-95 transition-all text-center">כניסה</button>
              <button onClick={() => setShowLoginModal(false)} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-full font-black text-lg active:scale-95 transition-all text-center">ביטול</button>
            </div>
          </div>
        </div>
      )}
{showVariantModal && selectedVariantProduct && (
        <div className="fixed inset-0 z-[800] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl animate-in fade-in text-center">
          <div className="bg-slate-900 border-2 border-amber-500 p-6 rounded-[2.5rem] shadow-2xl max-w-sm w-full animate-in zoom-in text-center relative overflow-y-auto max-h-[80vh]">
            <button onClick={() => setShowVariantModal(false)} className="absolute top-5 left-5 text-slate-500 hover:text-white"><X size={24}/></button>
            <h3 className="text-xl font-black mb-1 text-white text-center">{selectedVariantProduct.name}</h3>
            <p className="text-amber-500 text-sm font-bold mb-6 text-center">בחר את הסוגים שבא לך</p>

            <div className="space-y-4 mb-6">
{selectedVariantProduct.variants.map((variant) => {
  // 1. חישוב מלאי מקסימלי לסוג זה
  const maxStock = selectedVariantProduct.variant_stock?.[variant];
  const currentVal = variantSelections[variant] || 0;
  const isSoldOut = maxStock === 0; // האם נגמר המלאי לחלוטין
  const isLimitReached = maxStock !== null && maxStock !== undefined && currentVal >= maxStock;

  return (
    <div key={variant} className={`bg-slate-800/50 p-3 rounded-2xl border border-slate-700 flex items-center justify-between transition-all ${isSoldOut ? 'opacity-60' : ''}`}>
        {/* שם הסוג עם קו חוצה אם נגמר המלאי */}
        <span className={`font-bold text-sm pr-2 ${isSoldOut ? 'line-through text-slate-500 decoration-red-500 decoration-2' : 'text-slate-200'}`}>
          {variant} {isSoldOut && "(אזל)"}
        </span>

        <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-1 border border-slate-700">
          <button 
            type="button"
onClick={() => {
  if (currentVal > 0) {
     setVariantSelections(prev => ({...prev, [variant]: prev[variant] - 1}));
  }
}}
            className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-md text-white active:scale-90 transition-all"
          ><Minus size={14}/></button>

          <span className={`w-6 text-center font-black ${isSoldOut ? 'text-slate-600' : 'text-amber-500'}`}>
            {currentVal}
          </span>

          <button 
            type="button"
            // חסימת הכפתור אם נגמר המלאי או הגענו למקסימום
            disabled={isSoldOut || isLimitReached}
onClick={() => {
   const maxStock = selectedVariantProduct.variant_stock?.[variant];
   if (maxStock === null || maxStock === undefined || (variantSelections[variant] || 0) < maxStock) {
     setVariantSelections(prev => ({...prev, [variant]: (prev[variant] || 0) + 1}));
   }
}}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-white active:scale-90 transition-all shadow-lg ${isSoldOut || isLimitReached ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-amber-600'}`}
          ><Plus size={14}/></button>
        </div>
    </div>
  );
})}

            </div>

            <button onClick={handleConfirmVariants} className="w-full bg-amber-600 text-white py-4 rounded-full font-black text-lg text-center shadow-lg active:scale-95 transition-all">סיימתי לבחור</button>
          </div>
        </div>
      )}
      {showSaleStockModal && (
        <div className="fixed inset-0 z-[1300] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in fade-in">
          <div className="bg-slate-900 border-2 border-red-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="text-right">
                <h3 className="text-xl font-black text-white">מלאי למבצע סוף יום</h3>
                <p className="text-[10px] text-slate-500 font-bold">הגדר כמה נשאר מכל מוצר. השאר ריק למלאי לא מוגבל.</p>
              </div>
              <button onClick={() => setShowSaleStockModal(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1 custom-scrollbar">
              {products
                .filter(p => siteSettings.sale_categories?.includes(p.category || 'pastries'))
                .map(p => (
                  <div key={p.id} className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-right">
                      <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-slate-900" />
                      <span className="font-bold text-sm text-white">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number"
                        placeholder="∞"
                        className="w-16 bg-slate-900 border border-slate-600 p-2 rounded-xl text-center font-black text-red-500 outline-none focus:border-red-500"
                        defaultValue={p.sale_stock}
onBlur={async (e) => {
  const val = e.target.value === "" ? null : Number(e.target.value);

  // הגדרת המצב החדש לפי המספר שהקלדת
  let updates = { sale_stock: val };

  if (val === 0 && val !== null) {
    updates.is_sold_out = true;
    updates.is_fomo = false;
  } else if (val !== null && val < 5) {
    updates.is_fomo = true;
    updates.is_sold_out = false;
  } else {
    // מלאי מעל 5 או שדה ריק - מחזיר למצב רגיל
    updates.is_sold_out = false;
    updates.is_fomo = false;
  }

  const { error } = await supabase.from('products').update(updates).eq('id', p.id);
  if (!error) fetchProducts();
}}

                      />
                    </div>
                  </div>
                ))}
            </div>

            <button 
              onClick={() => setShowSaleStockModal(false)} 
              className="w-full mt-6 bg-red-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all"
            >
              סיימתי, עדכן מלאי
            </button>
          </div>
        </div>
      )}

      {showSaleModal && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center px-6 bg-black/95 backdrop-blur-xl animate-in fade-in">
          <div className="bg-slate-900 border-2 border-red-500 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(239,68,68,0.3)] max-sm w-full animate-in zoom-in text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
            <Flame className="mx-auto text-red-500 mb-4 animate-bounce" size={56} />
            <h3 className="text-3xl font-black mb-2 text-white italic">מבצע סוף יום!!</h3>
            <p className="text-slate-300 font-bold text-lg mb-6 leading-relaxed">
              חוגגים את סיום היום עם <span className="text-red-500 text-2xl font-black">{siteSettings.sale_discount_percent}% הנחה</span>
              <br />
              על כל ה
              <span className="text-white underline decoration-red-500 decoration-2 underline-offset-4 px-1">
                {categories.filter(c => siteSettings.sale_categories?.includes(c.slug)).map(c => c.name).join(', ')}
              </span>
            </p>
            <div className="bg-slate-800/50 py-3 px-6 rounded-2xl border border-red-500/20 mb-8 inline-block">
              <span className="text-slate-400 text-xs font-bold ml-2">בתוקף עד שעה:</span>
              <span className="text-white font-black">{siteSettings.sale_end_time}</span>
            </div>
            <button 
              onClick={() => setShowSaleModal(false)} 
              className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all shimmer-effect"
            >
              יאללה, תביאו לי! 🥐🔥
            </button>
          </div>
        </div>
      )}

      {/* Welcome Popup Component - Final Fixed Version (No Image Cutting) */}
      {showWelcomePopup && siteSettings.popup_active && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 py-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">

          {/* הקונטיינר הראשי */}
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-[2.5rem] shadow-2xl max-w-lg md:max-w-4xl w-full max-h-[90vh] animate-in zoom-in duration-300 relative flex flex-col overflow-hidden">

            {/* כפתור סגירה X */}
            <button 
              onClick={() => setShowWelcomePopup(false)} 
              className="absolute top-4 left-4 z-[2100] bg-black/60 text-white p-2 rounded-full hover:bg-red-500 transition-all shadow-lg border border-white/10"
            >
              <X size={20} />
            </button>

            {/* 1. כותרת / ברכה - תופס גובה קבוע */}
            <div className="pt-8 md:pt-10 px-6 md:px-12 text-center shrink-0">
              <h3 className="text-2xl md:text-4xl font-black text-amber-500 drop-shadow-lg leading-tight">
                {(() => {
                  const h = new Date().getHours();
                  let greeting = "לילה טוב";
                  if (h >= 5 && h < 12) greeting = "בוקר טוב";
                  else if (h >= 12 && h < 18) greeting = "צהריים טובים";
                  else if (h >= 18 && h < 22) greeting = "ערב טוב";
                  const firstName = customerName ? customerName.split(' ')[0] : "";
                  return `${greeting}${firstName ? `, ${firstName}` : ""}!`;
                })()}
              </h3>
            </div>

            {/* 2. אזור התוכן המרכזי - הגדרה קריטית של min-h-0 כדי למנוע דחיסה/חיתוך */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
              
              {/* צד ימין (מחשב) / עליון (נייד) - מלל */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center overflow-y-auto custom-scrollbar shrink-0 md:shrink">
                <div className="text-center">
                  <p 
                    className="text-white font-bold text-sm md:text-lg leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: siteSettings.popup_text?.replace(/\n/g, '<br/>') }}
                  ></p>
                </div>
              </div>

              {/* צד שמאל (מחשב) / תחתון (נייד) - תמונה */}
              {siteSettings.popup_image_url && (
                <div className="w-full md:w-1/2 p-4 md:p-6 flex items-center justify-center min-h-0 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center relative">
                    {siteSettings.popup_image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video 
                        src={siteSettings.popup_image_url} 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
                        autoPlay muted loop playsInline 
                      />
                    ) : (
                      <img 
                        src={siteSettings.popup_image_url} 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5" 
                        alt="Update" 
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. כפתור אישור - תמיד למטה, תופס גובה קבוע */}
            <div className="p-6 md:p-8 pt-2 md:pt-2 shrink-0">
              <button 
                onClick={() => setShowWelcomePopup(false)} 
                className="w-full bg-amber-500 hover:bg-amber-400 text-[#0f172a] py-3 md:py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all"
              >
                הבנתי, תודה!
              </button>
            </div>

          </div>
        </div>
      )}



      {/* 1. Customer Gallery Modal - מרכוז כפתורים ומיון חכם */}
      {showRecipesModal && (
        // שינוי קריטי: items-start pt-20 במקום items-center
        // זה גורם לחלונית להיות צמודה למעלה במובייל, כך שהמקלדת לא תסתיר אותה
        <div className="fixed inset-0 z-[1100] flex items-start md:items-center justify-center px-4 bg-black/90 backdrop-blur-xl animate-in fade-in pt-20 md:pt-0">
          <div className="bg-slate-900 border-2 border-slate-700 p-6 rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative animate-in zoom-in">

             {/* כפתורי פעולה בפינה */}
             <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                <button 
                  onClick={handleRecipesShare}
                  className="bg-slate-800 text-amber-500 p-2 rounded-full hover:bg-slate-700 transition-all active:scale-90 border border-slate-700"
                  title="שתף רשימת מתכונים"
                >
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={() => { setShowRecipesModal(false); setActiveRecipeCat("all"); setRecipeSearch(""); }} 
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X size={24}/>
                </button>
             </div>
          
             <div className="text-center mb-4">
                <BookOpen className="mx-auto text-pink-400 mb-2" size={32} />
                <h3 className="text-2xl font-black text-white">המתכונים של ליאור</h3>
                
                {/* תפריט קטגוריות ממורכז - תוקן ל-flex-wrap */}
                <div className="flex justify-center mt-4">
                   <div className="flex flex-wrap justify-center gap-2 w-full max-w-md">
                      <button 
                        onClick={() => setActiveRecipeCat("all")}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${activeRecipeCat === "all" ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}
                      >
                        הכל
                      </button>
                      {recipeCats.map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => setActiveRecipeCat(cat.slug)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all truncate ${activeRecipeCat === cat.slug ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="relative max-w-xs mx-auto mt-4 z-50">
                  <Search className="absolute right-3 top-3 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="חפש מתכון..." 
                    className="w-full bg-slate-800 border border-slate-700 p-2 pr-10 rounded-xl text-right text-xs text-white outline-none focus:border-pink-500 transition-colors" 
                    value={recipeSearch} 
                    onChange={(e) => setRecipeSearch(e.target.value)} 
onFocus={(e) => {
                      setTimeout(() => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 300);
                    }}
                  />

                  {/* רשימת השלמה אוטומטית (Autocomplete) */}
                  {recipeSearch.trim().length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden max-h-60 overflow-y-auto custom-scrollbar z-[60]">
                      {recipes.filter(r => r.title.includes(recipeSearch)).length > 0 ? (
                        recipes
                          .filter(r => r.title.includes(recipeSearch))
                          .map(r => (
                            <button
                              key={r.id}
                              onClick={() => {
                                setSelectedRecipe(r); // פותח את המתכון
                                setRecipeSearch("");  // מנקה את החיפוש כדי לסגור את הרשימה
                                logRecipeView(r, 'internal_click');
                              }}
                              className="w-full text-right px-3 py-2.5 text-xs text-slate-200 hover:bg-slate-800 border-b border-slate-800/50 last:border-0 flex items-center gap-3 transition-colors group"
                            >
                              <img src={r.image} className="w-8 h-8 rounded-lg object-cover bg-slate-800 border border-slate-700" alt="" />
                              <div className="flex flex-col items-start gap-0.5">
                                <span className="font-bold group-hover:text-pink-400 transition-colors">{r.title}</span>
                                {r.category_slug && (
                                   <span className="text-[9px] text-slate-500">
                                     {recipeCats.find(c => c.slug === r.category_slug)?.name || "כללי"}
                                   </span>
                                )}
                              </div>
                            </button>
                          ))
                      ) : (
                        <div className="p-3 text-[10px] text-slate-500 text-center font-bold">
                          לא מצאתי מתכון כזה... 🧑‍🍳
                        </div>
                      )}
                    </div>
                  )}
                </div>

             </div>

             <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
<div className="grid grid-cols-3 gap-3">
  {recipes
    .filter(r => (activeRecipeCat === "all" || r.category_slug === activeRecipeCat))
    .filter(r => r.title.includes(recipeSearch))
    .sort((a, b) => (activeRecipeCat === "all" ? 0 : (a.display_order || 0) - (b.display_order || 0)))
    .map(recipe => {
      // בדיקה אם המתכון הזה הוא אחד מ-3 המובילים (המרת ID לטקסט לצורך השוואה)
      const rank = recipeRanks[recipe.id.toString()];

      return (
        <div 
          key={recipe.id} 
          onClick={() => { 
            setSelectedRecipe(recipe); 
            logRecipeView(recipe, 'internal_click'); 
          }} 
          className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg cursor-pointer group active:scale-95 transition-all"
        >
          {/* תצוגת המדליה */}
          {rank && (
            <div className="absolute top-1.5 right-1.5 z-30 flex items-center justify-center animate-in zoom-in duration-500 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
              <div className={`relative flex items-center justify-center w-7 h-7 rounded-full border border-white/40 shadow-inner
                ${rank === 1 ? 'bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-600' : 
                  rank === 2 ? 'bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-400' : 
                  'bg-gradient-to-tr from-orange-800 via-orange-400 to-orange-800'}`}>
                
                {/* מספר הדירוג */}
                <span className="text-[11px] font-black text-[#0f172a] drop-shadow-sm">{rank}</span>
                
                {/* אייקון Trophy קטן */}
                <div className="absolute -top-1 -left-1">
                  <Trophy size={10} className={rank === 1 ? 'text-yellow-100' : 'text-white'} />
                </div>
              </div>
            </div>
          )}

          <img src={recipe.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-2">
            <span className="text-white font-black text-[10px] text-center leading-tight line-clamp-2 drop-shadow-md">
              {recipe.title}
            </span>
          </div>
        </div>
      );
    })}
</div>

             </div>
          </div>
        </div>
      )}

      {/* 2. Single Recipe View Modal - גרסה סופית: ללא השמטת פונקציות, תמונה מוקטנת וציפה מעל הבאנר */}
      {selectedRecipe && (
        // pb-20 מרים את כל המתכון מעל הבאנר של השמש והירח שנשארים דולקים ברקע
        <div className="fixed inset-0 z-[1200] flex items-center justify-center px-4 pb-20 bg-black/95 backdrop-blur-xl animate-in fade-in">
          
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md md:max-w-4xl lg:max-w-5xl h-[80vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-300">
             
             {/* Sticky Header - כותרת גמישה שלא נחתכת */}
             <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-3 md:p-4 sticky top-0 z-20 flex items-center justify-between shrink-0 gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                    <button 
                      onClick={() => {
                        setSelectedRecipe(null); 
                        setShowRecipesModal(true); 
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }}
                      className="bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-slate-700 transition-all active:scale-95 shadow-sm"
                    >
                      <LayoutGrid size={14} className="text-pink-500" />
                      <span className="text-[10px] md:text-xs font-black">כל המתכונים</span>
                    </button>

                    <button 
                      onClick={async () => {
                        const url = new URL(window.location.href);
                        url.searchParams.set('recipe', selectedRecipe.id);
                        const directLink = url.toString();
                        const baseText = `היי, קבלו מתכון ל${selectedRecipe.title} מאת ליאור בן משה! 🥐✨`;
                        if (navigator.share) {
                          try { await navigator.share({ title: selectedRecipe.title, text: baseText, url: directLink }); }
                          catch (err) { console.log(err); }
                        } else {
                           window.open(`https://wa.me/?text=${encodeURIComponent(baseText + "\n" + directLink)}`, '_blank');
                        }
                      }}
                      className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-slate-800 rounded-full text-amber-500 hover:text-white transition-all active:scale-95 border border-slate-700"
                    >
                      <Share2 size={16} />
                    </button>
                </div>

                {/* כותרת מותאמת: קטנה יותר בטלפון ויורדת שורה במידת הצורך */}
                <h3 className="text-sm md:text-lg font-black text-white text-center leading-tight px-2 flex-1 min-w-0 break-words">
                    {selectedRecipe.title}
                </h3>
                
                <button onClick={() => setSelectedRecipe(null)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all shrink-0">
                  <X size={20}/>
                </button>
             </div>

             {/* Content Area */}
             <div className="overflow-y-auto custom-scrollbar text-right pb-44">
                <div className="flex flex-col md:flex-row gap-0 md:gap-8 p-6 md:p-10">
                  
                  {/* תמונה ומידע - מוקטן ב-40% בנייד (max-w-168px) */}
                  <div className="md:w-1/3 shrink-0 flex flex-col items-center">
                    <div className="relative group w-full max-w-[168px] md:max-w-full aspect-square mb-4 md:mb-6">
{/* פונקציית הדפסה - מעודכנת: שומרת על מבנה פסקאות, בולד וקו תחתון */}
<button 
onClick={() => {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // פונקציה לעיבוד הטקסט ל-HTML עבור ההדפסה
  const formatForPrint = (text) => {
    // שלב 1: פיצול לפי פסקאות (שתי ירידות שורה ומעלה)
    // זה מבטיח שבלוקים של טקסט יישארו מאוחדים (חשוב למניעת שבירת דף באמצע רשימה)
    return text.split(/\n\s*\n/).map(block => {
      let processed = block;
      
      // טיפול בהדגשה (*טקסט*) - הופך ל-BOLD
      processed = processed.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      
      // טיפול בקו תחתון (#טקסט#) - הופך ל-UNDERLINE רק למה שבתוך הסולמיות
      processed = processed.replace(/#(.*?)#/g, '<u>$1</u>');
      
      // טיפול בירידות שורה בודדות בתוך הפיסקה (הופך ל-BR)
      processed = processed.replace(/\n/g, '<br/>');
      
      return `<div class="paragraph-block">${processed}</div>`;
    }).join('');
  };

  const formattedContent = formatForPrint(selectedRecipe.content);

  const printContent = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&display=swap');
          
          @page {
            margin: 15mm 15mm 20mm 15mm;
          }

          body { 
            font-family: 'Heebo', sans-serif; 
            direction: rtl; 
            margin: 0; 
            color: black;
            line-height: 1.5;
          }

          table { width: 100%; border-collapse: collapse; }

          .header-space { height: 70px; }
          .footer-space { height: 50px; }

          .header-content {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #f59e0b;
            background: white;
            z-index: 1000;
          }

          .logo { height: 50px; object-fit: contain; }
          .recipe-name-top { font-size: 14px; font-weight: bold; color: #666; }

          .footer-content {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            text-align: center;
            font-size: 11px;
            color: #888;
            border-top: 1px solid #eee;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* עיצוב הבלוקים של הטקסט */
          .paragraph-block {
            break-inside: avoid; /* מונע חיתוך של פיסקה/רשימה בין דפים */
            page-break-inside: avoid;
            margin-bottom: 15px; /* רווח בין פסקאות */
            font-size: 16px;
          }

          strong { font-weight: 900; }
          
          /* עיצוב לקו תחתון בהדפסה */
          u { 
            text-decoration: underline; 
            text-decoration-thickness: 1px;
            text-underline-offset: 4px;
          }

          .main-recipe-title { text-align: center; margin-top: 10px; font-size: 26px; }
          .author-name { text-align: center; font-size: 14px; color: #444; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <td>
                <div class="header-space"></div>
                <div class="header-content">
                  <img src="${siteSettings.logo_url}" class="logo" />
                  <div class="recipe-name-top">${selectedRecipe.title}</div>
                </div>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <h1 class="main-recipe-title">${selectedRecipe.title}</h1>
                <div class="author-name">מתכון מאת: ${selectedRecipe.author_name || 'ליאור בן משה'}</div>
                <div class="recipe-body">
                  ${formattedContent}
                </div>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>
                <div class="footer-space"></div>
                <div class="footer-content">
                  © כל הזכויות שמורות ל${selectedRecipe.author_name || 'ליאור בן משה'}. 
                  אין להעתיק, לשכפל או להפיץ.
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </body>
    </html>
  `;

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(printContent);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => { document.body.removeChild(iframe); }, 1000);
  }, 800);
}}

  className="absolute top-2 left-2 p-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white hover:bg-amber-600 transition-all z-10"
>
  <Printer size={16} />
</button>
                       <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/50 bg-slate-800">
                          <img src={selectedRecipe.image} className="w-full h-full object-cover" />
                       </div>
                    </div>
                    {selectedRecipe.author_name && (
                      <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl mb-6 md:mb-0">
                        <span className="text-amber-500 font-black text-[10px] md:text-base">המתכון של {selectedRecipe.author_name}</span>
                      </div>
                    )}
                  </div>

                  {/* אופן ההכנה - לוגיקת זיהוי שלבים חכמה + תמיכה בקו תחתון ובולד */}
                  <div className="flex-1 text-slate-200 text-sm md:text-base leading-relaxed font-medium select-none" onContextMenu={(e) => e.preventDefault()}>
                     {(() => {

                        const lines = selectedRecipe.content.split(/\r?\n/);
                        const groups = [];
                        let currentGroup = null;

                        // 1. הפונקציה המקורית שלך לעיצוב טקסט (קו תחתון ובולד) - ללא שינוי
                        const renderFormattedText = (txt) => {
                          const underlineParts = txt.split('#');
                          return underlineParts.map((uPart, uIndex) => {
                            const isUnderline = uIndex % 2 === 1;
                            const boldParts = uPart.split('*');
                            const renderedContent = boldParts.map((bPart, bIndex) => {
                              const isBold = bIndex % 2 === 1;
                              return isBold ? 
                                <strong key={bIndex} className="font-black text-white">{bPart}</strong> : 
                                <span key={bIndex}>{bPart}</span>;
                            });

                            return isUnderline ? 
                              <u key={uIndex} className="decoration-amber-500 underline-offset-4 decoration-2">{renderedContent}</u> : 
                              <span key={uIndex}>{renderedContent}</span>;
                          });
                        };

                        // 2. פונקציה מעודכנת: תומכת גם ב-YouTube וגם ב-MP4
                        const processContent = (text) => {
                            // א. בדיקת יוטיוב
                            const ytMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                            if (ytMatch && ytMatch[1]) {
                                return (
                                    <div className="w-full aspect-video my-4 rounded-xl overflow-hidden shadow-lg bg-black border border-slate-700 relative z-10" onClick={(e) => e.stopPropagation()}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                );
                            }

                            // ב. בדיקת קובץ MP4 ישיר (חדש!)
                            // מחפש קישור שמתחיל ב-http ומסתיים ב-.mp4 (לא רגיש לאותיות גדולות/קטנות)
                            const mp4Match = text.match(/(https?:\/\/[^\s]+\.mp4)/i);
                            if (mp4Match && mp4Match[1]) {
                                return (
                                    <div className="w-full aspect-video my-4 rounded-xl overflow-hidden shadow-lg bg-black border border-slate-700 relative z-10" onClick={(e) => e.stopPropagation()}>
                                        <video 
                                            controls 
                                            playsInline 
                                            className="w-full h-full object-contain"
                                            src={mp4Match[1]}
                                        >
                                            הדפדפן שלך לא תומך בתגית וידאו.
                                        </video>
                                    </div>
                                );
                            }

                            // ג. אם זה לא וידאו - מחזיר טקסט רגיל מעוצב
                            return renderFormattedText(text);
                        };

                        // 3. לוגיקת זיהוי השלבים המקורית שלך
                        lines.forEach((line) => {
                          const trimmed = line.trim();
                          const isNewStep = /^[^\w\u0590-\u05FF]*\d+[\.\)\-\:]/.test(trimmed);

                          if (trimmed === "") {
                            if (currentGroup) groups.push(currentGroup);
                            currentGroup = null;
                            groups.push({ type: 'empty' });
                          } else if (isNewStep) {
                            if (currentGroup) groups.push(currentGroup);
                            currentGroup = { type: 'step', text: line };
                          } else {
                            if (currentGroup) {
                              currentGroup.text += '\n' + line;
                            } else {
                              currentGroup = { type: 'text', text: line };
                            }
                          }
                        });
                        if (currentGroup) groups.push(currentGroup);

                        // 4. רינדור סופי
                        return groups.map((group, idx) => {
                          if (group.type === 'empty') return <div key={idx} className="h-4" />;
                          
                          const isStep = group.type === 'step';
                          
                          // שולח לפונקציה החדשה שבודקת וידאו
                          const content = processContent(group.text);

                          if (isMarkingSteps && isStep) {
                            const stepKey = `${selectedRecipe.id}-${idx}`;
                            const isChecked = checkedSteps[stepKey];
                            return (
                              <div key={idx} onClick={() => setCheckedSteps(prev => ({...prev, [stepKey]: !prev[stepKey]}))}
                                className={`flex items-start gap-3 p-4 md:p-5 rounded-2xl mb-4 transition-all cursor-pointer border shadow-sm ${isChecked ? 'bg-green-600/10 border-green-500/40 opacity-50' : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'}`}
                              >
                                <div className={`mt-0.5 w-5 h-5 md:w-7 md:h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-green-500 border-green-400' : 'bg-slate-900 border-slate-600'}`}>
                                  {isChecked && <Plus size={14} className="rotate-45 text-white" />}
                                </div>
                                <span className={`flex-1 whitespace-pre-wrap transition-all ${isChecked ? 'text-slate-400 line-through decoration-slate-500/50 decoration-2' : 'text-white font-bold'}`}>
                                  {content}
                                </span>
                              </div>
                            );
                          }
                          return <div key={idx} className="mb-2 whitespace-pre-wrap">{content}</div>;
                        });
                     })()}
  </div>

                </div>
             </div>

             {/* Sticky Footer - 3 כפתורים בשורה אחת, סטיקיים לתחתית החלונית */}
             <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent pt-12 z-30">
                <div className="max-w-3xl mx-auto flex items-stretch gap-2 md:gap-3">
                  
                  {/* 1. כפתור השאר מסך פעיל */}
                  <button 
                    onClick={toggleWakeLock}
                    className={`flex-1 flex flex-col items-center justify-center rounded-2xl border transition-all active:scale-95 py-2.5 ${isScreenAwake ? 'bg-amber-500 border-amber-400 text-[#0f172a]' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  >
                    <div className={isScreenAwake ? 'animate-pulse' : ''}><Flame size={20} /></div>
                    <span className="text-[9px] md:text-xs font-black mt-1 leading-tight uppercase">השאר מסך פעיל</span>
                  </button>

                  {/* 2. כפתור תיוג מרכזי - עיצוב מקורי ושם מעודכן */}
                  <button 
                    disabled={isSharing}
                    onClick={async () => {
                      try {
                        setIsSharing(true);
                        const handle = siteSettings.instagram_username || "liorbenmoshe.veganpatisserie";
                        const shareText = `גם אני הכנתי את ה${selectedRecipe.title} של ${handle.startsWith('@') ? handle : '@' + handle}`;
                        await navigator.clipboard.writeText(shareText);
                        setCopyNotification("המלל הועתק! הדביקו בסטורי ✨");
                        setTimeout(() => setCopyNotification(null), 3000);
                        if (navigator.share && selectedRecipe.image) {
                          const response = await fetch(selectedRecipe.image);
                          const blob = await response.blob();
                          const file = new File([blob], "recipe.jpg", { type: "image/jpeg" });
                          if (navigator.canShare && navigator.canShare({ files: [file] })) {
                            await navigator.share({ files: [file] });
                          } else { window.open(selectedRecipe.image, '_blank'); }
                        }
                      } catch (e) { console.error(e); }
                      finally { setIsSharing(false); }
                    }}
                    className="flex-[2.5] bg-gradient-to-r from-pink-600 to-amber-500 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all flex flex-col items-center justify-center gap-1 shimmer-effect px-2 text-center"
                  >
                    {isSharing ? <span className="animate-pulse text-xs">מכין...</span> : <><Instagram size={20} /><span className="text-[10px] md:text-xs font-black leading-tight uppercase">בהצלחה! תייגו אותי בתוצאות</span></>}
                  </button>

                  {/* 3. כפתור סימון שלבי הכנה */}
                  <button 
                    onClick={() => setIsMarkingSteps(!isMarkingSteps)}
                    className={`flex-1 flex flex-col items-center justify-center rounded-2xl border transition-all active:scale-95 py-2.5 ${isMarkingSteps ? 'bg-green-600 border-green-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  >
                    <BookOpen size={20} />
                    <span className="text-[10px] md:text-xs font-black mt-1 leading-tight uppercase text-center">סימון שלבי הכנה</span>
                  </button>
                </div>

                {/* הודעת העתקה צפה */}
                {copyNotification && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-4 py-1 rounded-full text-[10px] font-black shadow-xl animate-in slide-in-from-bottom-2">
                    {copyNotification}
                  </div>
                )}
             </div>

          </div>
        </div>
      )}




{showPendingOrdersModal && (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-orange-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2"><ShoppingCart size={20} className="text-orange-400" /> הזמנות בתהליך</h3>
        <button onClick={() => setShowPendingOrdersModal(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
      </div>

      <div className="overflow-y-auto space-y-3 flex-1 custom-scrollbar px-1">
        {pendingOrders.length > 0 ? pendingOrders.map((order) => (
          <div key={order.visitor_id} className="bg-slate-800/40 p-4 rounded-3xl border border-slate-700/50 hover:border-orange-500/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="text-right">
                <p className="font-black text-white text-sm">{order.customer_name || "לקוח/ה אנונימי/ת"}</p>
                {/* הצגת תאריך ושעה של עדכון אחרון */}
                <p className="text-[10px] text-orange-400 font-bold mt-1">
                  שינוי אחרון: {new Date(order.updated_at).toLocaleString('he-IL', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => deletePendingOrder(order.visitor_id)}
                  className="p-2 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                  title="מחק הזמנה מהרשימה"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => setSelectedPendingOrder(selectedPendingOrder === order.visitor_id ? null : order.visitor_id)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-black transition-all ${selectedPendingOrder === order.visitor_id ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-300'}`}
                >
                  {selectedPendingOrder === order.visitor_id ? 'סגור' : 'מה בסל?'}
                </button>
              </div>
            </div>

            {selectedPendingOrder === order.visitor_id && (
              <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 animate-in slide-in-from-top-2">
                {Object.entries(order.cart_data).map(([key, qty]) => {
                  const [idStr, variant] = key.split('__');
                  const p = products.find(prod => prod.id === Number(idStr));
                  return (
                    <div key={key} className="flex justify-between items-center bg-slate-900/50 p-2 rounded-xl border border-slate-800">
                      <div className="flex flex-col text-right">
                        <span className="text-xs font-bold text-white">{p?.name || "מוצר נמחק"}</span>
                        {variant && <span className="text-[9px] text-orange-400">{variant}</span>}
                      </div>
                      <span className="text-xs font-black text-orange-500">{qty} יח'</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )) : (
          <div className="text-center py-20 text-slate-600">
            <PackageX size={48} className="mx-auto mb-2 opacity-20" />
            <p className="font-bold text-sm">אין סלים פעילים כרגע</p>
          </div>
        )}
      </div>
      
      <button 
        onClick={() => setShowPendingOrdersModal(false)}
        className="w-full mt-6 bg-slate-800 text-white py-3 rounded-2xl font-black text-sm"
      >
        סגור חלונית
      </button>
    </div>
  </div>
)}

{/* חלונית תזכורת לסל ממתין */}
{showInactivityPopup && !isAdmin && (
  <div className="fixed inset-0 z-[2500] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-amber-500 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center animate-in zoom-in">
      <div className="bg-amber-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
        <ShoppingBasket className="text-amber-500 animate-bounce" size={40} />
      </div>
      
      <h3 className="text-xl font-black mb-2 text-white">המוצרים שבחרת מחכים לך פה</h3>
      <p className="text-slate-400 font-bold text-sm mb-8">
        שכחת ללחוץ על כפתור "תשמור לי"
      </p>

      <div className="flex flex-col gap-3">
        <button 
          onClick={() => {
            setShowInactivityPopup(false);
            handleWhatsAppClick(); // פותח את שלב מילוי הפרטים
          }} 
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} fill="currentColor" />
          סיימתי, אני רוצה להזמין
        </button>
        
        <button 
          onClick={() => setShowInactivityPopup(false)} 
          className="w-full bg-slate-800 text-slate-400 py-3 rounded-2xl font-bold text-sm hover:text-white transition-colors"
        >
          אל תשגע אותי, אני עוד מסתכל
        </button>
      </div>
    </div>
  </div>
)}

{showThresholdGiftModal && (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in fade-in text-center">
    <div className="bg-slate-900 border-2 border-green-500 p-6 rounded-[2.5rem] shadow-2xl max-w-lg w-full animate-in zoom-in">
      <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
        <PartyPopper size={32} />
      </div>
      <h3 className="text-xl font-black text-white mb-2 italic">איזה כיף! מגיע לך מתנה</h3>
      <p className="text-slate-400 font-bold text-sm mb-6">מכיוון שעברת את ה-₪{siteSettings.threshold_promo_limit}, תוכל לבחור מוצר אחד שתרצה לקבל מאיתנו במתנה:</p>
      
      <div className="grid grid-cols-3 gap-3 mb-8">
        {products.filter(p => siteSettings.threshold_promo_items?.includes(p.id)).map(p => (
          <div 
            key={p.id} 
            onClick={() => setSelectedGiftItem(p)}
            className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all active:scale-95 ${selectedGiftItem?.id === p.id ? 'border-green-500 bg-green-500/10 scale-105 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-slate-800 bg-slate-800/40 opacity-70'}`}
          >
            <div className="aspect-square relative">
              <img src={p.image} className="w-full h-full object-cover" />
              {selectedGiftItem?.id === p.id && (
                <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                  <div className="bg-green-500 text-white rounded-full p-1 shadow-lg"><Plus size={16} /></div>
                </div>
              )}
            </div>
            <div className="p-1.5 h-12 flex items-center justify-center">
              <span className="text-[10px] font-black text-white leading-tight">{p.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button 
          disabled={!selectedGiftItem}
          onClick={() => {
            setShowThresholdGiftModal(false);
            setShowPickupModal(true);
          }} 
          className="w-full bg-green-600 disabled:opacity-30 text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all"
        >
          בחרתי את המתנה שלי! 🎁
        </button>
        <button 
          onClick={() => {
            setSelectedGiftItem(null);
            setShowThresholdGiftModal(false);
            setShowPickupModal(true);
          }} 
          className="text-slate-500 font-bold text-[10px] uppercase hover:text-white transition-colors"
        >
          אני לא רוצה מתנה, המשך
        </button>
      </div>
    </div>
  </div>
)}

{showGiftSelectorInAdmin && (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl">
    <div className="bg-slate-900 border-2 border-green-500 p-6 rounded-[2rem] max-w-md w-full max-h-[80vh] flex flex-col">
      <h3 className="text-white font-black mb-4">בחר מוצרים שהלקוח יוכל לבחור כמתנה:</h3>
      <div className="overflow-y-auto space-y-2 flex-1 pr-2">
        {products.filter(p => p.is_visible).map(p => (
          <div key={p.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
            <span className="text-sm font-bold">{p.name}</span>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-green-500"
              checked={siteSettings.threshold_promo_items?.includes(p.id)}
              onChange={(e) => {
                const current = siteSettings.threshold_promo_items || [];
                const next = e.target.checked ? [...current, p.id] : current.filter(id => id !== p.id);
                setSiteSettings({...siteSettings, threshold_promo_items: next});
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={() => setShowGiftSelectorInAdmin(false)} className="w-full mt-4 bg-green-600 py-3 rounded-xl font-black text-white">סיימתי</button>
    </div>
  </div>
)}

{showRecipeStatsModal && (
  <div className="fixed inset-0 z-[2500] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-pink-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <BarChart3 className="text-pink-400" /> סטטיסטיקת מתכונים
        </h3>
        <button onClick={() => setShowRecipeStatsModal(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
      </div>

      {/* כפתורי מיון חדשים */}
      <div className="bg-slate-800 p-1 rounded-xl flex mb-4 border border-slate-700">
        <button 
            onClick={() => setRecipeSortMode('total')}
            className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${recipeSortMode === 'total' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
            סה"כ צפיות
        </button>
        <button 
            onClick={() => setRecipeSortMode('internal')}
            className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${recipeSortMode === 'internal' ? 'bg-green-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
            לחיצה באתר
        </button>
        <button 
            onClick={() => setRecipeSortMode('direct')}
            className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${recipeSortMode === 'direct' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
            קישור ישיר
        </button>
      </div>

      <div className="overflow-y-auto space-y-2 flex-1 custom-scrollbar px-1">
        {(() => {
          // 1. ספירת הצפיות שקיימות ב-DB
          const counts = {};
          recipeStatsData.forEach(event => {
            const id = event.metadata.recipe_id;
            if (!counts[id]) counts[id] = { direct: 0, internal: 0, total: 0 };
            counts[id].total++;
            if (event.metadata.view_type === 'direct_link') counts[id].direct++;
            else counts[id].internal++;
          });

          // 2. מיון חכם לפי הבחירה שלך
          const sortedAllRecipes = [...recipes].sort((a, b) => {
             const statA = counts[a.id] || { total: 0, direct: 0, internal: 0 };
             const statB = counts[b.id] || { total: 0, direct: 0, internal: 0 };

             if (recipeSortMode === 'direct') return statB.direct - statA.direct;
             if (recipeSortMode === 'internal') return statB.internal - statA.internal;
             return statB.total - statA.total; // ברירת מחדל: סה"כ
          });

          return sortedAllRecipes.map((recipe, idx) => {
            const stats = counts[recipe.id] || { direct: 0, internal: 0, total: 0 };
            // אם אין צפיות בכלל, נציג רק אם זה המיון הכללי, אחרת נסתיר כדי לא להעמיס
            if (stats.total === 0 && recipeSortMode !== 'total') return null;

            return (
              <div key={recipe.id} className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[9px] font-black ${stats.total > 0 ? 'bg-pink-600' : 'bg-slate-700'} text-white`}>
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-white truncate">{recipe.title}</span>
                  </div>
                  
                  {/* המספר הגדול בצד משתנה לפי המיון */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`font-black text-sm ${recipeSortMode === 'direct' ? 'text-blue-400' : recipeSortMode === 'internal' ? 'text-green-400' : 'text-pink-400'}`}>
                        {recipeSortMode === 'direct' ? stats.direct : recipeSortMode === 'internal' ? stats.internal : stats.total}
                    </span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase">
                        {recipeSortMode === 'direct' ? 'ישיר' : recipeSortMode === 'internal' ? 'פנימי' : 'סה"כ'}
                    </span>
                  </div>
                </div>
                
                {/* שורת הפירוט המלא */}
                <div className="flex gap-2 mt-2">
                  <div className={`flex-1 p-1.5 rounded-xl text-center border transition-colors ${recipeSortMode === 'direct' ? 'bg-blue-600/20 border-blue-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
                    <p className="text-[7px] text-slate-500 font-bold uppercase">קישור ישיר</p>
                    <p className="text-[10px] font-black text-blue-400">{stats.direct}</p>
                  </div>
                  <div className={`flex-1 p-1.5 rounded-xl text-center border transition-colors ${recipeSortMode === 'internal' ? 'bg-green-600/20 border-green-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
                    <p className="text-[7px] text-slate-500 font-bold uppercase">לחיצה באתר</p>
                    <p className="text-[10px] font-black text-green-400">{stats.internal}</p>
                  </div>
                </div>
              </div>
            );
          });
        })()}
      </div>

      <button 
        onClick={async () => {
          if(confirm("לאפס את כל סטטיסטיקת הצפיות במתכונים?")) {
            await supabase.from('site_events').delete().eq('event_name', 'recipe_view');
            setRecipeStatsData([]);
          }
        }}
        className="mt-4 text-red-500 text-[10px] font-bold py-2 hover:bg-red-500/10 rounded-xl transition-all"
      >
        איפוס נתוני צפיות
      </button>

      <button onClick={() => setShowRecipeStatsModal(false)} className="w-full mt-2 bg-slate-800 text-white py-3 rounded-2xl font-black text-sm">סגור</button>
    </div>
  </div>
)}


{/* About Modal - גרסה 12.0: תיקון סטיקי למחשב וצמצום רווחים סופי */}
{showAboutModal && (
  <div className="fixed inset-0 z-[2500] flex items-center justify-center px-4 pb-20 bg-black/95 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border border-slate-700 w-full max-w-md md:max-w-4xl h-[75vh] md:h-[65vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in duration-300">
      
      {/* Header - Sticky */}
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-3 md:p-4 sticky top-0 z-50 flex items-center justify-between shrink-0">
        <button 
          onClick={async () => {
            const shareUrl = `${window.location.origin}${window.location.pathname}?view=about`;
            const shareText = `הכירו את ליאור בן משה - הקונדיטור שמאחורי הפטיסרי הטבעוני! 👨‍🍳✨`;
            if (navigator.share) { await navigator.share({ title: 'ליאור בן משה', text: shareText, url: shareUrl }); }
            else { window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank'); }
          }}
          className="w-9 h-9 flex items-center justify-center bg-slate-800 rounded-full text-pink-400 border border-slate-700 shadow-lg active:scale-90"
        >
          <Share2 size={18} />
        </button>
        <h3 className="text-lg font-black text-white">מי אני</h3>
        <button onClick={() => setShowAboutModal(false)} className="w-9 h-9 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all">
          <X size={20}/>
        </button>
      </div>

      {/* Content Area - גלילה מנוהלת */}
      <div className="overflow-y-auto custom-scrollbar flex-1 relative bg-slate-900">
        {/* השינוי כאן: md:items-start מונע מהתמונה להימתח ומאפשר לה להיות סטיקית */}
        <div className="flex flex-col md:flex-row items-center md:items-start min-h-full">
          
          {/* תמונה סטיקית - עובדת עכשיו גם במחשב */}
          <div className="w-full md:w-auto shrink-0 p-4 md:p-8 sticky top-0 z-30 bg-slate-900/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
             <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/50 bg-slate-800 shrink-0 mx-auto md:mx-0">
                <img 
                  src={siteSettings.about_image_url || siteSettings.logo_url} 
                  className="w-full h-full object-cover" 
                  alt="Lior"
                />
             </div>
          </div>

          {/* טקסט - צמוד לתמונה ונגלל */}
          <div className="flex-1 p-6 md:p-8 md:pr-0 pt-0 md:pt-8 text-right">
             <div 
               className="text-slate-200 text-base md:text-lg leading-relaxed font-medium whitespace-pre-wrap"
               dangerouslySetInnerHTML={{ __html: siteSettings.about_text }}
             />

             {/* Footer בתוך הגלילה */}
             <div className="mt-16 flex flex-col items-center opacity-30 text-center pb-8">
                <img src={siteSettings.logo_url} className="w-20 grayscale mb-2" />
                <p className="text-[8px] font-black tracking-[0.2em]">LIOR BEN MOSHE • SINCE 2016</p>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
)}

{showAboutStatsModal && (
  <div className="fixed inset-0 z-[2500] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-pink-500 p-6 rounded-[2.5rem] shadow-2xl max-w-md w-full animate-in zoom-in text-right">
      
      {/* כותרת */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <User className="text-pink-400" /> פירוט צפיות ב-"מי אני"
        </h3>
        <button onClick={() => setShowAboutStatsModal(false)} className="text-slate-500 hover:text-white transition-colors">
          <X size={24}/>
        </button>
      </div>

      <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-inner space-y-6">
        
        {/* סך הכל צפיות */}
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">סך הכל חשיפות</p>
          <p className="text-4xl font-black text-white">
            {(aboutStats.internal_click || 0) + (aboutStats.direct_link || 0)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* כרטיס לחיצה באתר */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-pink-500/20 text-center">
            <div className="bg-pink-500/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-pink-500">
              <MousePointer2 size={18} />
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase">לחיצה בתוך האתר</p>
            <p className="text-xl font-black text-white">{aboutStats.internal_click || 0}</p>
          </div>

          {/* כרטיס כניסה מקישור */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-blue-500/20 text-center">
            <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-400">
              <ExternalLink size={18} />
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase">כניסה מקישור ישיר</p>
            <p className="text-xl font-black text-white">{aboutStats.direct_link || 0}</p>
          </div>
        </div>

        {/* כפתור איפוס */}
        <button 
          onClick={async () => {
            if(window.confirm("לאפס את כל סטטיסטיקת ה-'מי אני'?")) {
              await supabase.from('site_events').delete().eq('event_name', 'about_view');
              // פונקציית fetchVisits תעדכן את הנתונים מיד
              if (typeof fetchVisits === 'function') fetchVisits();
            }
          }}
          className="w-full py-2 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} /> איפוס נתונים
        </button>
      </div>

      <button 
        onClick={() => setShowAboutStatsModal(false)} 
        className="w-full mt-6 bg-pink-600 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all"
      >
        סגור פירוט
      </button>
    </div>
  </div>
)}


      {showNavModal && (
        <div className="fixed inset-0 z-[800] flex items-end justify-center px-4 pb-6 bg-black/70 backdrop-blur-sm animate-in fade-in text-center" onClick={() => setShowNavModal(false)}>
          <div className="bg-[#1e293b] border-t-2 border-amber-500/30 w-full max-w-sm rounded-[2.5rem] p-6 animate-in slide-in-from-bottom-full duration-300 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6 opacity-50 text-center" />
            <h3 className="text-lg font-black text-white mb-6 text-center">איך תרצו לנווט?</h3>
            <div className="space-y-3 text-center">
              <button onClick={() => openNavigationApp('waze')} className="flex items-center justify-between w-full bg-slate-800/80 hover:bg-slate-700 p-5 rounded-2xl transition-all border border-slate-700 active:scale-95 text-center"><span className="font-bold text-white text-lg text-center">Waze</span><ArrowLeft size={18} className="text-amber-500 text-center" /></button>
              <button onClick={() => openNavigationApp('google')} className="flex items-center justify-between w-full bg-slate-800/80 hover:bg-slate-700 p-5 rounded-2xl transition-all border border-slate-700 active:scale-95 text-center"><span className="font-bold text-white text-lg text-center">Google Maps</span><ArrowLeft size={18} className="text-amber-500 text-center" /></button>
              {/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) && (<button onClick={() => openNavigationApp('apple')} className="flex items-center justify-between w-full bg-slate-800/80 hover:bg-slate-700 p-5 rounded-2xl transition-all border border-slate-700 active:scale-95 text-center"><span className="font-bold text-white text-lg text-center">Apple Maps</span><ArrowLeft size={18} className="text-amber-500 text-center" /></button>)}
              <button onClick={() => setShowNavModal(false)} className="w-full py-4 text-slate-500 font-black text-xs uppercase tracking-widest mt-2 hover:text-slate-300 transition-colors text-center">ביטול</button>
            </div>
          </div>
        </div>
      )}
{showCartSummaryModal && (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
    <div className="bg-slate-900 border-2 border-green-500 p-6 rounded-[2.5rem] shadow-2xl max-w-sm w-full animate-in zoom-in relative flex flex-col max-h-[85vh]">
      {/* כפתור סגירה */}
      <button onClick={() => setShowCartSummaryModal(false)} className="absolute top-5 left-5 text-slate-500 hover:text-white transition-colors"><X size={24}/></button>

      {/* כותרת החלונית */}
      <div className="text-center mb-6">
        <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-green-500 shadow-lg shadow-green-500/10">
          <ShoppingBasket size={32} />
        </div>
        <h3 className="text-xl font-black text-white">הסל שלי</h3>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">פירוט ההזמנה שלך</p>
      </div>

      {/* רשימת המוצרים בסל */}
      <div className="overflow-y-auto space-y-3 pr-1 custom-scrollbar flex-1">
        {Object.entries(cart).length > 0 ? (
          Object.entries(cart).map(([key, qty]) => {
            const [idStr, variant] = key.split('__');
            const p = products.find(prod => prod.id === Number(idStr));
            if (!p) return null;
            return (
              <div key={key} className="bg-slate-800/40 border border-slate-700/50 p-3 rounded-2xl flex items-center justify-between group transition-all hover:bg-slate-800/60">
                <div className="flex flex-col text-right">
                  <span className="font-bold text-sm text-white leading-tight">{p.name}</span>
                  {variant && <span className="text-[10px] text-amber-500 font-black mt-0.5">סוג: {variant}</span>}
                  <span className="text-[10px] text-slate-400 mt-1 font-bold">₪{p.price * qty}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* כפתור מחיקה מהיר */}
                  <button 
                    onClick={() => updateQty(p.id, -qty, variant)} 
                    className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    title="הסר פריט"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* פקדי כמות */}
                  <div className="flex items-center gap-2 bg-slate-900/80 rounded-xl p-1 border border-slate-700">
                    <button onClick={() => updateQty(p.id, -1, variant)} className="w-7 h-7 flex items-center justify-center bg-slate-800 rounded-lg text-white hover:bg-slate-700 active:scale-90 transition-all"><Minus size={12}/></button>
                    <span className="w-5 text-center font-black text-green-500 text-sm">{qty}</span>
                    <button onClick={() => updateQty(p.id, 1, variant)} className="w-7 h-7 flex items-center justify-center bg-green-600 rounded-lg text-white hover:bg-green-500 active:scale-90 transition-all shadow-md shadow-green-600/20"><Plus size={12}/></button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-600">
             <PackageX size={48} className="mb-2 opacity-20" />
             <p className="font-bold text-sm">הסל ריק כרגע...</p>
          </div>
        )}
      </div>

      {/* סיכום וכפתור אישור */}
      <div className="mt-6 pt-4 border-t border-slate-800 space-y-4">
        <div className="flex justify-between items-center px-2">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">סה"כ זמני לתשלום</span>
            <span className="text-2xl font-black text-green-500 leading-none">₪{getFinalTotal()}</span>
          </div>
{getFinalTotal() !== calculateTotal() && (
   <div className="text-left">
     <span className="text-[10px] text-slate-500 line-through block">₪{calculateTotal()}</span>
     {(() => {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;
        return (
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${isSale ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-amber-500 bg-amber-500/10'}`}>
            {isSale ? 'מבצע סוף יום פעיל! 🔥' : 'הופעלה הנחה!'}
          </span>
        );
     })()}
   </div>
)}

        </div>
        {/* כפתור שיתוף סל להתייעצות עם פירוט מחיר והטבות */}
        {Object.keys(cart).length > 0 && (
          <button 
            onClick={() => {
              // 1. פירוט פריטים
              const items = Object.entries(cart).map(([key, qty]) => {
                const [idStr, variant] = key.split('__');
                const p = products.find(prod => prod.id === Number(idStr));
                const nameDisplay = variant ? `${p?.name} (${variant})` : p?.name;
                return `- ${qty} x ${nameDisplay} (₪${p?.price * qty})`;
              }).join('\n');

// 2. חישוב הטבות
let benefitsText = "";
const now = new Date();
const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
const isSale = siteSettings.sale_active && currentTime < siteSettings.sale_end_time;

if (isSale) {
  benefitsText += `*🔥 הופעל מבצע סוף יום: ${siteSettings.sale_discount_percent}% הנחה על מגוון קטגוריות! *\n`;
} else {
  if (goldenWinnerItem) {
    benefitsText += `*🌟 זכיתי במאפה מוזהב במתנה! (${goldenWinnerItem.name})*\n`;
  }
  if (isCouponValid()) {
    benefitsText += `*✨ קוד קופון הופעל (-${siteSettings.coupon_discount_percent}%)*\n`;
  }
  if (isDiscountActive) {
    if (siteSettings.reward_type === '12_percent') benefitsText += `*🎁 הופעלה הנחה סודית של 12%!*\n`;
    else if (siteSettings.reward_type === '5_percent') benefitsText += `*🎁 הופעלה הנחה סודית של 5%!*\n`;
    else if (siteSettings.reward_type === '6th_free') {
      const freeCount = Math.floor(totalPastriesInCart / 6);
      if (freeCount > 0) benefitsText += `*🥐 קיבלתי ${freeCount} מאפים במתנה! (6 ב-5)*\n`;
    }
  }
}

              // 3. סיכום מחיר
              const finalTotal = getFinalTotal();
              const originalTotal = calculateTotal();
              const priceSummary = finalTotal < originalTotal 
                ? `*סה"כ לתשלום: ₪${finalTotal}* (במקום ₪${originalTotal})`
                : `*סה"כ לתשלום: ₪${finalTotal}*`;

              const shareMsg = `היי, תראו מה אני מזמין מליאור בן משה 🥐✨:\n\n${items}\n\n${benefitsText}${priceSummary}\n\nמה אתם רוצים להוסיף? הנה הלינק:\n${window.location.href}`;

              window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`, '_blank');
            }}
            className="w-full bg-slate-800 border border-slate-700 text-slate-300 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 mb-3 hover:bg-slate-700 transition-all active:scale-95 shadow-lg"
          >
            <Share2 size={14} className="text-primary" />
            שיתוף הסל וההטבות (התייעצות)
          </button>
        )}

        <button 
          onClick={() => { setShowCartSummaryModal(false); handleWhatsAppClick(); }} 
          className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} fill="currentColor" />
          תשמור לי את הכל!
        </button>
      </div>
    </div>
  </div>
)}

      {/* באנר ורכיבי צידו - תצוגת משתמש */}
      {!isAdmin && (
        <>
            {/* כפתורי צד (סל ורוקן סל) - טקסט בשורה אחת */}
            {Object.keys(cart).length > 0 && (
              <>
                {/* כפתור מה בסל - ימין */}
                <div className="fixed top-[25%] right-0 z-[100] -translate-y-1/2 pointer-events-none">
                  <button 
                    onClick={() => setShowCartSummaryModal(true)} 
                    className="bg-green-600 w-[50px] text-white py-2 rounded-l-2xl shadow-2xl border-y border-l border-green-400/50 flex flex-col items-center justify-center gap-1 backdrop-blur-md active:scale-90 transition-all pointer-events-auto animate-slide-right"
                  >
                    <ShoppingBag size={14} /> 
                    <div className="flex flex-col items-center leading-none w-full">
                       <span className="text-[8px] font-black uppercase whitespace-nowrap">סל ({Object.values(cart).reduce((a, b) => a + b, 0)})</span>
                    </div>
                  </button>
                </div>

                {/* כפתור רוקן סל - שמאל */}
                <div className="fixed top-[25%] left-0 z-[100] -translate-y-1/2 pointer-events-none">
                  <button 
                    onClick={clearCart} 
                    className="bg-red-600 w-[50px] text-white py-2 rounded-r-2xl shadow-2xl border-y border-r border-red-400/50 flex flex-col items-center justify-center gap-1 backdrop-blur-md active:scale-90 transition-all pointer-events-auto animate-slide-left"
                  >
                    <Trash2 size={14} /> 
                    <span className="text-[8px] font-black uppercase whitespace-nowrap leading-none">רוקן סל</span>
                  </button>
                </div>
              </>
            )}


          {/* באנר שמש/ירח - נשאר בתחתית המסך, מרכז */}
          {/* באנר שמש/ירח עם אנימציית ירידה/עלייה */}
          <div 
            style={{ zIndex: 9998 }} 
            className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[50%] pointer-events-none flex justify-center transition-transform duration-500 ease-in-out ${isUrgentActive ? 'translate-y-full' : 'translate-y-0'}`}
          >

            {(() => {
              const fairDays = siteSettings.fair_days || [];
              if (sunDismissed || fairDays.length === 0) return null;

              const [openH, openM] = (siteSettings.opening_hour || "12:00").split(':').map(Number);
              const [closeH, closeM] = (siteSettings.closing_hour || "20:30").split(':').map(Number);

              const firstDay = Math.min(...fairDays);
              const lastDay = Math.max(...fairDays);
              
              let fairStart = new Date(nowTime);
              fairStart.setDate(nowTime.getDate() - (nowTime.getDay() - firstDay));
              fairStart.setHours(openH, openM, 0, 0);

              let fairEnd = new Date(nowTime);
              fairEnd.setDate(nowTime.getDate() + (lastDay - nowTime.getDay()));
              fairEnd.setHours(closeH, closeM, 0, 0);

              if (nowTime > fairEnd) {
                fairStart.setDate(fairStart.getDate() + 7);
                fairEnd.setDate(fairEnd.getDate() + 7);
              }

              const isFairActive = nowTime >= fairStart && nowTime <= fairEnd;

              let timerMs, icon, label, gradient, shadow;

              if (isFairActive) {
                timerMs = fairEnd - nowTime;
                icon = "☀️";
                label = "זמן נותר להזמנות:";
                gradient = "from-yellow-400 via-orange-500 to-amber-600";
                shadow = "shadow-[0_0_15px_rgba(245,158,11,0.4)]";
              } else {
                timerMs = fairStart - nowTime;
                icon = "🌙";
                label = "הזמנות יפתחו בעוד:";
                gradient = "from-indigo-900 via-blue-900 to-slate-800";
                shadow = "shadow-[0_0_15px_rgba(30,58,138,0.4)]";
              }

              const d = Math.floor(timerMs / (1000 * 60 * 60 * 24));
              const h = Math.floor((timerMs / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
              const m = Math.floor((timerMs / (1000 * 60)) % 60).toString().padStart(2, '0');
              const s = Math.floor((timerMs / 1000) % 60).toString().padStart(2, '0');
              
              const timerDisplay = `${d > 0 ? d + ' ימים ו-' : ''}${h}:${m}:${s}`;

              return (
                <button 
                  onClick={() => {
                    setSunDismissed(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setShowWelcomePopup(false); setShowRecipesModal(false); setSelectedRecipe(null);
                    setShowCartSummaryModal(false); setShowPickupModal(false); setShowVariantModal(false);
                    setShowStatsModal(false); setShowSettingsModal(false); setShowExtraSettingsModal(false);
                    setShowPendingOrdersModal(false); setShowNavModal(false); setShowSaleModal(false);
                    setShowGoldenModal(false); setShowThankYouModal(false); setShowRandomizerModal(false);
                    setPreviewImage(null); setShowLoginModal(false); setShowDayWarning(false);
                    setShowEmptyCartModal(false); setShowDiscountModal(false); setShowAlreadyActiveModal(false);
                    setShowAddItemModal(false); setShowCategoryManager(false); setShowDeleteCategoryModal(false);
                    setShowRecipeFormModal(false); setShowRecipeCatManager(false); setShowSaleStockModal(false);
                    setShowSaveConfirm(false); setCategoryTip(null); setActiveTip(null);
                  }}
                  className={`bg-gradient-to-r ${gradient} text-white px-5 py-1 rounded-t-2xl ${shadow} pointer-events-auto ${isFairActive ? 'animate-sun' : ''} active:scale-95 transition-all flex flex-col items-center border-t border-x border-white/20 whitespace-nowrap overflow-hidden`}
                >
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="text-base">{icon}</span>
                    <span className="font-black text-[11px] md:text-sm tracking-tighter">
                      {label} {timerDisplay}
                    </span>
                    <Clock size={11} className="opacity-70" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold opacity-90 leading-none mt-0.5">
                    לחיצה תוביל לדף הבית והעלמת הבאנר
                  </span>
                </button>
              );
            })()}
          </div>
        </>
      )}



    </div>
  );
}
